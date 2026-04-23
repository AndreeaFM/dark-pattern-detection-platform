const mongoose = require('mongoose')

const detectionSchema = new mongoose.Schema(
  {
    patternType: {
      type: String,
      required: true,
    },
    matchedText: {
      type: String,
      default: '',
    },
    explanation: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      default: 0.8,
    },
  },
  { _id: false }
)

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    inputType: {
      type: String,
      enum: ['url', 'screenshot'],
      required: true,
    },
    inputValue: {
      type: String,
      required: true,
    },
    extractedText: {
      type: String,
      default: '',
    },
    detections: {
      type: [detectionSchema],
      default: [],
    },
    riskScore: {
      type: Number,
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Analysis', analysisSchema)
