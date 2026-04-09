import express from 'express'
import { body } from 'express-validator'
import {
  signupAdmin,
  signinAdmin,
  getAdminProfile
} from '../controllers/adminController.js'
import { authenticateAdmin } from '../middleware/auth.js'

const router = express.Router()

// Signup validation middleware
const signupValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }).withMessage('Name too long'),
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(['admin', 'superadmin']).withMessage('Invalid role')
]

// Signin validation middleware
const signinValidation = [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').notEmpty().withMessage('Password is required')
]

// Routes
router.post('/signup', signupValidation, signupAdmin)
router.post('/signin', signinValidation, signinAdmin)
router.get('/profile', authenticateAdmin, getAdminProfile)

export default router