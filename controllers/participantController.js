import Participant from '../models/Participant.js'
import { validationResult } from 'express-validator'

export const registerParticipant = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { name, age, gender, competition, instructor, phone, email, address } = req.body

    // Check if participant already exists
    const existingParticipant = await Participant.findOne({ email })
    if (existingParticipant) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Create new participant
    const participant = new Participant({
      name,
      age,
      gender,
      competition,
      instructor,
      phone,
      email,
      address
    })

    await participant.save()

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      participant
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

    let query = {}
    if (competition) {
      query.competition = competition
    }

    const participants = await Participant.find(query).populate('competition').sort({ createdAt: -1 })

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
    const totalParticipants = await Participant.countDocuments()

    res.status(200).json({
      success: true,
      stats: {
        totalParticipants
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
    const participants = await Participant.find()

    // CSV header
    const csvHeader = ['Name', 'Age', 'Gender', 'Instructor', 'Phone', 'Email', 'Address', 'Registered Date']
    
    // CSV rows
    const csvRows = participants.map(p => [
      p.name,
      p.age,
      p.gender,
      p.instructor,
      p.phone,
      p.email,
      p.address,
      new Date(p.createdAt).toLocaleDateString()
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
