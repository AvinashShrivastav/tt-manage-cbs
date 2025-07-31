require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/subjects', require('./routes/subjects'));
app.use('/api/faculty', require('./routes/faculty'));
app.use('/api/students', require('./routes/students'));
app.use('/api/timetable', require('./routes/timetable'));
app.use('/api/rooms', require('./routes/rooms'));

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://WjtBtV1OXQau8BhJ//TTM:@cluster0.inzx0m9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
