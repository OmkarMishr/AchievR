const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activityId: { type: String, unique: true },
  
  // Basic Info
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Technical', 'Sports', 'Cultural', 'Volunteering', 'Internship', 'Academic', 'Leadership', 'Research', 'Other'],
    required: true
  },
  
  // Details
  organizingBody: String,
  achievementLevel: {
    type: String,
    enum: ['College', 'University', 'State', 'National', 'International']
  },
  eventDate: { type: Date, required: true },
  duration: Number, // in days
  
  // File uploads
  proofDocuments: [{
    filename: String,
    url: String,
    uploadedAt: Date
  }],
  
  // AI Extracted Data
  extractedSkills: [String],
  aiConfidenceScore: Number,
  aiSummary: String,
  
  // Approval Workflow
  status: {
    type: String,
    enum: ['draft', 'pending', 'info_requested', 'approved', 'certified', 'rejected'],
    default: 'pending'
  },
  
  submittedAt: Date,
  
  // Faculty Review
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  facultyComment: String,
  reviewedAt: Date,
  
  // Admin Certification
  certifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  certificateHash: String,
  certificateUrl: String,
  qrCodeUrl: String,
  blockchainData: {
    blockNumber: Number,
    previousHash: String,
    timestamp: Date
  },
  certifiedAt: Date,
  
  // Rejection/Info Request
  rejectionReason: String,
  infoRequested: String,
  
}, { timestamps: true });

// Generate unique activity ID before saving
activitySchema.pre('save', async function(next) {
  if (!this.activityId) {
    const year = new Date().getFullYear();
    const count = await this.constructor.countDocuments();
    this.activityId = `ACT-${year}-${String(count + 1).padStart(6, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Activity', activitySchema);