import Event from '../models/Event.js'
import { validationResult } from 'express-validator'

export const getEvent = async (req, res) => {
  try {
    let event = await Event.findOne()

    // If no event exists, create a default one
    if (!event) {
      event = new Event({
        title: 'GYPL 2026 - Yoga Competition',
        organizer: 'Yoga Association',
        presenter: 'Chief Guest',
        date: 'April 15, 2026',
        venue: 'Sports Complex, City Center',
        contact: '+91-9876543210',
        description: 'Annual Yoga Competition featuring various categories and talent showcase'
      })
      await event.save()
    }

    res.status(200).json({
      success: true,
      event
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}

export const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    const { title, organizer, presenter, date, venue, contact, description } = req.body

    let event = await Event.findOne()

    if (event) {
      // Update existing event
      event.title = title
      event.organizer = organizer
      event.presenter = presenter
      event.date = date
      event.venue = venue
      event.contact = contact
      event.description = description
      await event.save()
    } else {
      // Create new event
      event = new Event({
        title,
        organizer,
        presenter,
        date,
        venue,
        contact,
        description
      })
      await event.save()
    }

    res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    })
  }
}