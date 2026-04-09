import express from 'express'
import { body } from 'express-validator'
import {
  getAllCompetitions,
  getCompetition,
  createCompetition,
  updateCompetition,
  deleteCompetition
} from '../controllers/competitionController.js'

const router = express.Router()

// Validation middleware for competition
const competitionValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('fees').isNumeric().withMessage('Fees must be a number'),
  body('performance').trim().notEmpty().withMessage('Performance details are required')
]

// Routes
router.get('/', getAllCompetitions)
router.get('/:id', getCompetition)
router.post('/', competitionValidation, createCompetition)
router.put('/:id', competitionValidation, updateCompetition)
router.delete('/:id', deleteCompetition)

export default router