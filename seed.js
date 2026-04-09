import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Competition from './models/Competition.js'
import Event from './models/Event.js'

dotenv.config()

const competitions = [
  {
    name: 'Yogasana Premier League',
    fees: 600,
    ageCategory: 'All Ages',
    performance: '3 Own-Choice Asanas',
    categories: [],
    prizes: [
      '1st, 2nd & 3rd: Medal + Certificate',
      'All 1st Winners: Smart Watch'
    ],
    benefits: [
      'Merit Certificate',
      'Participation Medal',
      'Pool & Resort Access'
    ]
  },
  {
    name: 'Supreme Asana League',
    fees: 1100,
    ageCategory: 'All Ages',
    performance: '4 Own-Choice Asanas',
    categories: [],
    prizes: [
      '1st: Bluetooth Speaker',
      '2nd: Power Bank',
      '3rd: Headset/Earbuds'
    ],
    benefits: [
      'Merit Certificate',
      'Participation Medal',
      'Free Pool + Resort Access'
    ]
  },
  {
    name: 'Ultimate Asana Faceoff League',
    fees: 2100,
    ageCategory: 'All Ages',
    performance: 'Hand Balance, Leg Balance, Backbend, Forward Bend, Twist',
    categories: [],
    prizes: [
      'Top 3: Medal + Certificate',
      '1st & 2nd: 15g Silver Coin + Bicycle',
      '1st & 2nd: Trolley Bag'
    ],
    benefits: [
      'Merit Certificate',
      'Participation Medal',
      'Free Pool + Resort Access'
    ]
  },
  {
    name: 'Talent Showcase',
    fees: 600,
    ageCategory: 'All Ages',
    performance: 'Various Talent Performances',
    categories: [
      'Music',
      'Dance',
      'Art',
      'Performing Talent',
      'Artistic Yoga',
      'Rhythmic Yoga'
    ],
    prizes: [
      '₹5000, ₹3000, ₹2000, ₹1000, ₹500'
    ],
    benefits: [
      'Merit Certificate',
      'Participation Medal',
      'Free Pool + Resort Access'
    ]
  }
]

const eventData = {
  title: 'GYPL 2026 - Yoga Competition',
  organizer: 'Yoga Association',
  presenter: 'Chief Guest',
  date: 'April 15, 2026',
  venue: 'Sports Complex, City Center',
  contact: '+91-9876543210',
  description: 'Annual Yoga Competition featuring various categories and talent showcase with special attractions including art stalls, food stalls, and more.'
}

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://testuser:1234@cluster0.3qtal8r.mongodb.net/')
    console.log('Connected to MongoDB')

    // Clear existing data
    await Competition.deleteMany({})
    await Event.deleteMany({})
    console.log('Cleared existing data')

    // Insert competitions
    await Competition.insertMany(competitions)
    console.log('Competitions seeded successfully')

    // Insert event
    await Event.create(eventData)
    console.log('Event seeded successfully')

    console.log('Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()