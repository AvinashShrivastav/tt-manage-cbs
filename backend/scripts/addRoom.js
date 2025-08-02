const mongoose = require('mongoose');
const Room = require('../models/Room');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:5000/timetable';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const newRoom = new Room({
  number: '543',
  name: 'Kaveri',
  type: 'classroom',
});

newRoom.save()
  .then(room => {
    console.log('Room added successfully:', room);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error adding room:', err);
    mongoose.connection.close();
  });
