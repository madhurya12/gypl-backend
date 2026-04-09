# Backend - Grand Yoga Premier League 2026

Node.js + Express + MongoDB backend API for yoga competition event management.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start server
npm start

# Development with auto-reload (requires nodemon)
npm run dev

# Or directly run:
node server.js
```

The backend API will be available at `http://localhost:5000`

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB object modeling
- **cors**: Cross-Origin Resource Sharing
- **dotenv**: Environment variables
- **express-validator**: Input validation

### Dev Dependencies
- **nodemon**: Auto-restart on file changes

## 🏗️ Project Structure

```
backend/
├── models/
│   └── Participant.js          # MongoDB schema
├── controllers/
│   └── participantController.js # Business logic
├── routes/
│   └── participantRoutes.js     # API endpoints
├── server.js                    # Main server file
├── .env                         # Environment config
└── package.json                 # Dependencies
```

## 🗄️ Database Schema

### Participant Collection

```javascript
{
  _id: ObjectId,
  name: String (required, max 100),
  age: Number (required, 5-100),
  gender: String (required, enum: Male/Female/Other),
  category: String (required, enum: Faceoff League/Talent Showcase),
  instructor: String (required, max 100),
  phone: String (required, 10 digits, unique pattern),
  email: String (required, unique),
  address: String (required, max 300),
  createdAt: Date (default: now)
}
```

## 🔌 API Endpoints

All endpoints use JSON format.

### Health Check
```
GET /health
Response: { status: "Server is running" }
```

### Register Participant
```
POST /api/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "age": 25,
  "gender": "Male",
  "category": "Faceoff League",
  "instructor": "Yoga Master",
  "phone": "9876543210",
  "email": "john@example.com",
  "address": "123 Yoga Street"
}

Response (201):
{
  "success": true,
  "message": "Registration successful!",
  "participant": { ... }
}
```

### Get All Participants
```
GET /api/participants
Response:
{
  "success": true,
  "count": 10,
  "participants": [ ... ]
}
```

### Filter by Category
```
GET /api/participants?category=Faceoff League
GET /api/participants?category=Talent Showcase

Response:
{
  "success": true,
  "count": 5,
  "participants": [ ... ]
}
```

### Get Statistics
```
GET /api/participants/stats
Response:
{
  "success": true,
  "stats": {
    "totalParticipants": 10,
    "faceoffCount": 6,
    "talentCount": 4
  }
}
```

### Export CSV
```
GET /api/participants/export/csv
Response: CSV file download
```

## ✅ Validation Rules

### Name
- Required
- Max 100 characters
- Trimmed

### Age
- Required
- Integer between 5 and 100

### Gender
- Required
- Must be: Male, Female, or Other

### Category
- Required
- Must be: Faceoff League or Talent Showcase

### Instructor
- Required
- Max 100 characters
- Trimmed

### Phone
- Required
- Exactly 10 digits (regex: `/^[0-9]{10}$/`)

### Email
- Required
- Valid email format
- Unique (no duplicate emails)

### Address
- Required
- Max 300 characters
- Trimmed

## 🔄 Middleware Stack

1. **CORS**: Cross-origin requests allowed
2. **JSON Parser**: Parse incoming JSON
3. **URL Encoded**: Parse form data
4. **Routes**: API endpoints
5. **Error Handler**: Centralized error handling
6. **404 Handler**: Catch undefined routes

## 🗄️ MongoDB Setup

### Prerequisites
1. Install MongoDB Community Edition
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-macos/)
   - [Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

2. Start MongoDB service
   ```bash
   # Windows (if installed as service)
   # MongoDB should auto-start
   
   # Or start manually:
   mongod
   
   # Mac/Linux
   brew services start mongodb-community
   # or
   mongod
   ```

### Connection String
Default: `mongodb://localhost:27017/yoga-competition`

Edit in `.env` file to change database name or connection string.

## 🔐 Environment Variables

Create `.env` file in backend directory:

```
MONGO_URI=mongodb://localhost:27017/yoga-competition
PORT=5000
NODE_ENV=development
ADMIN_PASSWORD=admin123
```

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: development/production
- `ADMIN_PASSWORD`: Admin login password

## 🎯 Error Handling

All endpoints return consistent error responses:

```javascript
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (dev only)"
}
```

Status Codes:
- `200`: Success
- `201`: Created successfully
- `400`: Bad request / validation error
- `404`: Not found
- `500`: Server error

## 📊 CSV Export Format

The CSV export includes:
- Header row: Name, Age, Gender, Category, Instructor, Phone, Email, Address, Registered Date
- Data rows: One participant per row
- Quoted fields for safety
- File name: `participants-YYYY-MM-DD.csv`

## 🧪 Testing Endpoints

Using curl or Postman:

```bash
# Test health check
curl http://localhost:5000/health

# Register participant
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 25,
    "gender": "Male",
    "category": "Faceoff League",
    "instructor": "Yoga Master",
    "phone": "9876543210",
    "email": "john@example.com",
    "address": "123 Street"
  }'

# Get all participants
curl http://localhost:5000/api/participants

# Filter by category
curl "http://localhost:5000/api/participants?category=Faceoff%20League"

# Get statistics
curl http://localhost:5000/api/participants/stats

# Export CSV
curl http://localhost:5000/api/participants/export/csv > participants.csv
```

## 🚀 Deployment Considerations

For production deployment:
1. Use environment variables for all config
2. Enable proper CORS settings
3. Use HTTPS (not HTTP)
4. Implement rate limiting
5. Add authentication (JWT tokens)
6. Use MongoDB Atlas for managed database
7. Deploy to services like Heroku, AWS, DigitalOcean

## 🐛 Common Issues

**MongoDB connection error**: Ensure MongoDB is running
```bash
mongod --version  # Check if installed
mongod            # Start the service
```

**Port 5000 already in use**: Change PORT in .env file

**CORS errors**: Verify CORS middleware is enabled in server.js

**Validation errors**: Check error message details in response

## 📝 File Descriptions

### server.js
Main entry point that:
- Creates Express app
- Sets up middleware
- Connects to MongoDB
- Registers routes
- Starts server on specified port

### models/Participant.js
Mongoose schema defining:
- Document structure
- Field types and validation
- Default values
- Custom validators

### controllers/participantController.js
Handles business logic for:
- registerParticipant: Save new participant
- getAllParticipants: Fetch with optional category filter
- getParticipantStats: Get counts by category
- exportParticipantsCSV: Generate CSV download

### routes/participantRoutes.js
Defines API endpoints:
- POST /register with validation
- GET /participants
- GET /participants/stats
- GET /participants/export/csv

## 🎓 Learning Resources

- [Express.js Guide](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [REST API Best Practices](https://restfulapi.net/)

## 📞 Debugging

Enable detailed logging by setting NODE_ENV=development in .env

Check logs in console for:
- Database connection status
- Request/response timing
- Validation errors
- Server startup confirmation

---

Happy API building! 🚀
