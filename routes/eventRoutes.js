import express from 'express'
import { body } from 'express-validator'
import { getEvent, updateEvent } from '../controllers/eventController.js'

const router = express.Router()

// Validation middleware for event update
const eventValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('organizer').trim().notEmpty().withMessage('Organizer is required'),
  body('presenter').trim().notEmpty().withMessage('Presenter is required'),
  body('date').trim().notEmpty().withMessage('Date is required'),
  body('venue').trim().notEmpty().withMessage('Venue is required'),
  body('contact').trim().notEmpty().withMessage('Contact is required'),
  body('description').trim().notEmpty().withMessage('Description is required')
]

// Routes
router.get('/', getEvent)
router.put('/', eventValidation, updateEvent)

export default router