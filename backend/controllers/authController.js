const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// @route   POST /api/auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password, role, rollNumber, department, year, mobile } = req.body;

        if (!name || !email || !password || !rollNumber) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const existingRollNumber = await User.findOne({ rollNumber });
        if (existingRollNumber) {
            return res.status(400).json({ success: false, message: 'Roll number already registered' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'student',
            rollNumber,
            department,
            year,
            mobile
        });

        const verificationToken = crypto.randomBytes(32).toString('hex');
        user.emailVerificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');
        user.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;
        user.isEmailVerified = false;
        await user.save();

        const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
        await sendEmail({
            to: user.email,
            subject: 'Verify Your Email - AchievR Platform',
            html: `
                <h2>Welcome ${user.name}!</h2>
                <p>Please verify your email by clicking the link below:</p>
                <a href="${verificationUrl}">Verify Email</a>
                <p>This link expires in 24 hours.</p>
            `
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Registration successful. Please verify your email.',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                rollNumber: user.rollNumber
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   POST /api/auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        if (!user.isEmailVerified) {
            return res.status(403).json({ success: false, message: 'Please verify your email first' });
        }

        user.lastLogin = Date.now();
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                rollNumber: user.rollNumber,
                department: user.department
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   POST /api/auth/verify-email
exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ success: false, message: 'Verification token is required' });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            emailVerificationToken: hashedToken,
            emailVerificationExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   POST /api/auth/logout
exports.logout = async (req, res) => {
    try {
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: 'Please provide email' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.passwordResetExpire = Date.now() + 30 * 60 * 1000;
        await user.save();

        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendEmail({
            to: user.email,
            subject: 'Password Reset - AchievR Platform',
            html: `
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">Reset Password</a>
                <p>This link expires in 30 minutes.</p>
            `
        });

        res.status(200).json({ success: true, message: 'Password reset email sent' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @route   POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: 'Token and new password are required' });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        user.password = newPassword;
        user.passwordResetToken = undefined;
        user.passwordResetExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
