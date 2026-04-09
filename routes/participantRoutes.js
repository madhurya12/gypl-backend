import express from 'express'
import { body } from 'express-validator'
import {
  registerParticipant,
  getAllParticipants,
  getParticipantStats,
  exportParticipantsCSV
} from '../controllers/participantController.js'

const router = express.Router()

// Registration validation middleware
const registrationValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
  body('age').isInt({ min: 5, max: 100 }).withMessage('Age must be between 5 and 100'),
  body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('competition').isMongoId().withMessage('Valid competition ID is required'),
  body('instructor').trim().notEmpty().withMessage('Instructor name is required').isLength({ max: 100 }).withMessage('Instructor name too long'),
  body('phone').matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  body('email').isEmail().withMessage('Invalid email'),
  body('address').trim().notEmpty().withMessage('Address is required').isLength({ max: 300 }).withMessage('Address too long')
]

// Routes
router.post('/register', registrationValidation, registerParticipant)
router.get('/participants', getAllParticipants)
router.get('/participants/stats', getParticipantStats)
router.get('/participants/export/csv', exportParticipantsCSV)

export default router
