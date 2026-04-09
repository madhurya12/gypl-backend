import Competition from '../models/Competition.js'
import { validationResult } from 'express-validator'

export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: competitions.length,
      competitions
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const getCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id)

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      })
    }

    res.status(200).json({
      success: true,
      competition
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const createCompetition = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { name, fees, ageCategory, performance, categories, prizes, benefits } = req.body

    const competition = new Competition({
      name,
      fees,
      ageCategory,
      performance,
      categories,
      prizes,
      benefits
    })

    await competition.save()

    res.status(201).json({
      success: true,
      message: 'Competition created successfully',
      competition
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const updateCompetition = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { name, fees, ageCategory, performance, categories, prizes, benefits } = req.body

    const competition = await Competition.findById(req.params.id)

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      })
    }

    competition.name = name
    competition.fees = fees
    competition.ageCategory = ageCategory
    competition.performance = performance
    competition.categories = categories
    competition.prizes = prizes
    competition.benefits = benefits

    await competition.save()

    res.status(200).json({
      success: true,
      message: 'Competition updated successfully',
      competition
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const deleteCompetition = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id)

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      })
    }

    await Competition.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: 'Competition deleted successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}