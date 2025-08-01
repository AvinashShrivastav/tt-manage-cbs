const mongoose = require('mongoose');
const Room = require('../models/Room');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

async function seedRooms() {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

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

  await Room.deleteMany({});
  await Room.insertMany(sampleRooms);
  console.log('Sample rooms added');
  mongoose.disconnect();
}

seedRooms().catch(err => {
  console.error(err);
  mongoose.disconnect();
});
