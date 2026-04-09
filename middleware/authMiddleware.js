import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please log in.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'yoga-competition-secret-key')
    req.userId = decoded.userId
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}

export default authMiddleware
