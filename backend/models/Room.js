const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['classroom', 'lab', 'auditorium'], required: true },
  capacity: { type: Number, required: false },
  equipment: [{ type: String, required: false }],
  building: { type: String, required: false },
  floor: { type: Number, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
