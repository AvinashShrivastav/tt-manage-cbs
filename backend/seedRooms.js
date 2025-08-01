const mongoose = require('mongoose');
const Room = require('./models/Room');

mongoose.connect('mongodb://localhost:27017/YOUR_DB_NAME'); // Replace with your DB name

const sampleRooms = [
  {
    number: '101',
    name: 'Physics Lab',
    type: 'lab',
    capacity: 40,
    equipment: ['Projector', 'Lab Benches'],
    building: 'Science Block',
    floor: 1,
  },
  {
    number: '202',
    name: 'Classroom A',
    type: 'classroom',
    capacity: 60,
    equipment: ['Whiteboard'],
    building: 'Main Block',
    floor: 2,
  },
];

Room.insertMany(sampleRooms)
  .then(() => {
    console.log('Sample rooms added');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  });
