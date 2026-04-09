import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import participantRoutes from './routes/participantRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import eventRoutes from './routes/eventRoutes.js'
import competitionRoutes from './routes/competitionRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userEventRoutes from './routes/userEventRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', participantRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/competitions', competitionRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/user', userEventRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://testuser:1234@cluster0.3qtal8r.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
