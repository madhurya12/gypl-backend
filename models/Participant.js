import mongoose from 'mongoose'

const participantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  age: {
    type: Number,
    required: [true, 'Please provide age'],
    min: [5, 'Age must be at least 5 years'],
    max: [100, 'Age must be less than 100 years']
  },
  gender: {
    type: String,
    required: [true, 'Please select gender'],
    enum: ['Male', 'Female', 'Other']
  },
  competition: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Competition',
    required: [true, 'Please select a competition']
  },
  instructor: {
    type: String,
    required: [true, 'Please provide instructor name'],
    trim: true,
    maxlength: [100, 'Instructor name cannot be more than 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
    match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  address: {
    type: String,
    required: [true, 'Please provide address'],
    maxlength: [300, 'Address cannot be more than 300 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Participant = mongoose.model('Participant', participantSchema)

export default Participant
