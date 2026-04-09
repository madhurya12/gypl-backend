import User from '../models/User.js'
import Competition from '../models/Competition.js'

export const registerForCompetition = async (req, res) => {
  try {
    const { competitionId } = req.params
    const userId = req.userId

    // Validate competitionId
    if (!competitionId) {
      return res.status(400).json({
        success: false,
        message: 'Competition ID is required'
      })
    }

    // Check if competition exists
    const competition = await Competition.findById(competitionId)
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      })
    }

    // Check if user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Check if user is already registered for this competition
    if (user.registeredEvents.includes(competitionId)) {
      return res.status(400).json({
        success: false,
        message: 'You are already registered for this competition'
      })
    }

    // Add competition to user's registeredEvents
    user.registeredEvents.push(competitionId)
    await user.save()

    // Add user to competition's participants
    if (!competition.participants.includes(userId)) {
      competition.participants.push(userId)
      await competition.save()
    }

    res.status(200).json({
      success: true,
      message: 'Successfully registered for the competition!',
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

export const getMyRegisteredEvents = async (req, res) => {
  try {
    const userId = req.userId

    const user = await User.findById(userId).populate('registeredEvents')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      events: user.registeredEvents,
      count: user.registeredEvents.length
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const unregisterFromCompetition = async (req, res) => {
  try {
    const { competitionId } = req.params
    const userId = req.userId

    // Check if user exists
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Check if competition exists
    const competition = await Competition.findById(competitionId)
    if (!competition) {
      return res.status(404).json({
        success: false,
        message: 'Competition not found'
      })
    }

    // Remove competition from user's registeredEvents
    user.registeredEvents = user.registeredEvents.filter(
      (id) => id.toString() !== competitionId
    )
    await user.save()

    // Remove user from competition's participants
    competition.participants = competition.participants.filter(
      (id) => id.toString() !== userId
    )
    await competition.save()

    res.status(200).json({
      success: true,
      message: 'Successfully unregistered from the competition!'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}
