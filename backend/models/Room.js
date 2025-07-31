const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  type: { type: String, enum: ['classroom', 'lab', 'auditorium'], required: true },
  capacity: { type: Number, required: true },
  equipment: [{ type: String, required: true }],
  building: { type: String, required: true },
  floor: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Room', RoomSchema);
