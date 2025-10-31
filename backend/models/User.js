const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin', 'verifier'],
    default: 'student'
  },
  
  // Student-specific fields
  rollNumber: { type: String, unique: true, sparse: true },
  department: String,
  year: Number,
  batch: String,
  mobile: String,
  dateOfBirth: Date,
  profilePhoto: String,
  bloodGroup: String,
  address: String,
  interests: [String],
  
  // Faculty/Admin fields
  employeeId: { type: String, unique: true, sparse: true },
  designation: String,
  
  // Verification
  isEmailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpire: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
