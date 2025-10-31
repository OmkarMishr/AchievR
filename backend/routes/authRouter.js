const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    getMe, 
    verifyEmail,
    logout,
    forgotPassword,
    resetPassword 
} = require('../controllers/authController');
const { protect, requireEmailVerified } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
