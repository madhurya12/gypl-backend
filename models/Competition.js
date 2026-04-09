import mongoose from 'mongoose'

const competitionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide competition name'],
    trim: true
  },
  fees: {
    type: Number,
    required: [true, 'Please provide fees'],
    min: [0, 'Fees cannot be negative']
  },
  ageCategory: {
    type: String,
    default: 'All Ages'
  },
  performance: {
    type: String,
    required: [true, 'Please provide performance details']
  },
  categories: [{
    type: String,
    trim: true
  }],
  prizes: [{
    type: String,
    trim: true
  }],
  benefits: [{
    type: String,
    trim: true
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Competition', competitionSchema)