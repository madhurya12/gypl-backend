import express from 'express'
import {
  registerForCompetition,
  getMyRegisteredEvents,
  unregisterFromCompetition
} from '../controllers/userEventController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Protected routes - all require authentication
router.post('/register/:competitionId', authMiddleware, registerForCompetition)
router.get('/my-events', authMiddleware, getMyRegisteredEvents)
router.delete('/unregister/:competitionId', authMiddleware, unregisterFromCompetition)

export default router
