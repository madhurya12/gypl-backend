import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide event title'],
    trim: true
  },
  organizer: {
    type: String,
    required: [true, 'Please provide organizer name'],
    trim: true
  },
  presenter: {
    type: String,
    required: [true, 'Please provide presenter name'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Please provide event date']
  },
  venue: {
    type: String,
    required: [true, 'Please provide venue'],
    trim: true
  },
  contact: {
    type: String,
    required: [true, 'Please provide contact information'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide event description'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Event', eventSchema)