import express from 'express'
import { userSignup, userLogin, getUserProfile } from '../controllers/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.post('/signup', userSignup)
router.post('/login', userLogin)

// Protected routes
router.get('/profile', authMiddleware, getUserProfile)

export default router
