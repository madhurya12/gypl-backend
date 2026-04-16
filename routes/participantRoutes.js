import express from 'express'
import { body } from 'express-validator'
import {
  registerParticipant,
  getAllParticipants,
  getParticipantStats,
  exportParticipantsCSV
} from '../controllers/participantController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Registration validation - simplified for User model (only competition ID required)
const registrationValidation = [
  body('competition').isMongoId().withMessage('Valid competition ID is required')
]

// Routes
router.post('/register', authMiddleware, registrationValidation, registerParticipant)
router.get('/participants', getAllParticipants)
router.get('/participants/stats', getParticipantStats)
router.get('/participants/export/csv', exportParticipantsCSV)

export default router
