const mongoose = require('mongoose');

const fraudDetectionSchema = new mongoose.Schema({
  activity: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
  fraudScore: { type: Number, min: 0, max: 100 },
  verdict: { type: String, enum: ['authentic', 'suspicious', 'forged'] },
  concerns: [String],
  recommendation: { type: String, enum: ['auto_approve', 'flag_for_review', 'auto_reject'] },
  confidenceLevel: { type: Number, min: 0, max: 100 },
  analyzedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('FraudDetection', fraudDetectionSchema);
