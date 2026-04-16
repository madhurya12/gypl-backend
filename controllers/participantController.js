import User from '../models/User.js'
import Competition from '../models/Competition.js'
import { validationResult } from 'express-validator'

export const registerParticipant = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const userId = req.userId
    const { competition } = req.body

    // Verify user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Verify competition exists
    const comp = await Competition.findById(competition)
    if (!comp) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      })
    }

    // Check if user is already registered for this competition
    if (user.registeredEvents.includes(competition)) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this competition'
      })
    }

    // Add competition to user's registeredEvents
    user.registeredEvents.push(competition)
    await user.save()

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        registeredEvents: user.registeredEvents
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const getAllParticipants = async (req, res) => {
  try {
    const { competition } = req.query

    let users
    if (competition) {
      // Get users registered for specific competition
      users = await User.find({
        registeredEvents: competition
      }).populate('registeredEvents').select('-password')
    } else {
      // Get all users with any registrations
      users = await User.find({
        registeredEvents: { $exists: true, $ne: [] }
      }).populate('registeredEvents').select('-password')
    }

    // Flatten user registrations into participants format for admin
    const participants = []
    users.forEach(user => {
      if (competition) {
        // If specific competition filter, return single entry per user
        // Find the specific competition in registeredEvents
        const competitionData = user.registeredEvents.find(
          event => event && event._id.toString() === competition.toString()
        )
        
        participants.push({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          userId: user._id,
          competition: competitionData || null,
          instructor: 'N/A', // Not tracked in User model
          age: 'N/A', // Not tracked in User model
          gender: 'N/A', // Not tracked in User model
          address: 'N/A', // Not tracked in User model
          createdAt: user.createdAt
        })
      } else {
        // Return entry for each competition they're registered for
        user.registeredEvents.forEach(event => {
          participants.push({
            _id: `${user._id}-${event && event._id ? event._id : 'unknown'}`,
            name: user.name,
            email: user.email,
            phone: user.phone,
            userId: user._id,
            competition: event || null, // Return full competition object or null if missing
            instructor: 'N/A', // Not tracked in User model
            age: 'N/A', // Not tracked in User model
            gender: 'N/A', // Not tracked in User model
            address: 'N/A', // Not tracked in User model
            createdAt: user.createdAt
          })
        })
      }
    })

    res.status(200).json({
      success: true,
      count: participants.length,
      participants
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error fetching participants: ' + error.message
    })
  }
}

export const getParticipantStats = async (req, res) => {
  try {
    // Count users with at least one registration
    const totalUsers = await User.countDocuments({
      registeredEvents: { $exists: true, $ne: [] }
    })

    // Count total registrations
    const usersWithRegs = await User.find({
      registeredEvents: { $exists: true, $ne: [] }
    })
    let totalRegistrations = 0
    usersWithRegs.forEach(user => {
      totalRegistrations += user.registeredEvents.length
    })

    res.status(200).json({
      success: true,
      stats: {
        totalParticipants: totalUsers,
        totalRegistrations: totalRegistrations
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error fetching stats: ' + error.message
    })
  }
}

export const exportParticipantsCSV = async (req, res) => {
  try {
    const users = await User.find({
      registeredEvents: { $exists: true, $ne: [] }
    }).populate('registeredEvents').select('-password')

    // Flatten into participants format
    let participants = []
    users.forEach(user => {
      user.registeredEvents.forEach(event => {
        participants.push({
          name: user.name,
          email: user.email,
          phone: user.phone,
          age: 'N/A', // Not tracked in User model
          gender: 'N/A', // Not tracked in User model
          competition: event && event.name ? event.name : 'N/A',
          fees: event && event.fees ? event.fees : 'N/A',
          instructor: 'N/A', // Not tracked in User model
          address: 'N/A', // Not tracked in User model
          registeredAt: new Date(user.createdAt).toLocaleDateString()
        })
      })
    })

    // CSV header - match Admin.jsx export order
    const csvHeader = ['Name', 'Age', 'Gender', 'Competition', 'Fees', 'Instructor', 'Phone', 'Email', 'Address', 'Registered Date']
    
    // CSV rows
    const csvRows = participants.map(p => [
      p.name,
      p.age,
      p.gender,
      p.competition,
      p.fees,
      p.instructor,
      p.phone,
      p.email,
      p.address,
      p.registeredAt
    ])

    const csv = [csvHeader, ...csvRows].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=participants.csv')
    res.send(csv)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Error exporting CSV: ' + error.message
    })
  }
}
