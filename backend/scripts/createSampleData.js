const mongoose = require('mongoose');
const User = require('../models/User');
const Faculty = require('../models/Faculty');
const Student = require('../models/Student');
const Subject = require('../models/Subject');
const TimetableEntry = require('../models/TimetableEntry');
const Room = require('../models/Room');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  // Users
  const hashedPassword = await bcrypt.hash('test1234', 10);
  await User.deleteMany({});
  await User.create({ email: 'test@sscbs.du.ac.in', password: hashedPassword });

  // Faculty
  await Faculty.deleteMany({});
  await Faculty.insertMany([
    { name: 'Dr. Rajesh Kumar', email: 'rajesh@sscbs.du.ac.in', phone: '+91-9876543210', department: 'Management', subjects: ['MG101', 'MG201'] },
    { name: 'Prof. Priya Sharma', email: 'priya@sscbs.du.ac.in', phone: '+91-9876543211', department: 'Finance', subjects: ['FN101'] },
    { name: 'Dr. Amit Singh', email: 'amit@sscbs.du.ac.in', phone: '+91-9876543212', department: 'Computer Science', subjects: ['CS201', 'CS301'] },
    { name: 'Prof. Neha Gupta', email: 'neha@sscbs.du.ac.in', phone: '+91-9876543213', department: 'Mathematics', subjects: ['MA101'] }
  ]);

  // Students
  await Student.deleteMany({});
  await Student.insertMany([
    { name: 'Arjun Mehta', rollNo: 'BMS21001', email: 'arjun@student.du.ac.in', course: 'BMS', year: '3rd', section: 'A', group: 'G1' },
    { name: 'Priya Patel', rollNo: 'BFIA22015', email: 'priya@student.du.ac.in', course: 'BFIA', year: '2nd', section: 'B', group: 'G1' },
    { name: 'Rohit Kumar', rollNo: 'CS20008', email: 'rohit@student.du.ac.in', course: 'CS', year: '4th', section: 'A', group: 'G2' },
    { name: 'Sneha Gupta', rollNo: 'BMS23045', email: 'sneha@student.du.ac.in', course: 'BMS', year: '1st', section: 'C', group: 'G2' }
  ]);

  // Subjects
  await Subject.deleteMany({});
  await Subject.insertMany([
    { name: 'Data Structures and Algorithms', code: 'CS201', course: 'B.Sc. Computer Science', year: '2nd Year', semester: '3rd Semester', department: 'Computer Science', totalCredits: 6, theoryCredits: 4, labCredits: 2, tutorialCredits: 0 },
    { name: 'Financial Management', code: 'FN101', course: 'BMS', year: '2nd Year', semester: '3rd Semester', department: 'Finance', totalCredits: 4, theoryCredits: 4, labCredits: 0, tutorialCredits: 0 },
    { name: 'Business Mathematics', code: 'MA101', course: 'BMS', year: '1st Year', semester: '1st Semester', department: 'Mathematics', totalCredits: 4, theoryCredits: 4, labCredits: 0, tutorialCredits: 0 }
  ]);

  // Rooms
  await Room.deleteMany({});
  await Room.insertMany([
    { number: 'LT-101', type: 'classroom', capacity: 60, equipment: ['Projector', 'Whiteboard'], building: 'Main Block', floor: 1 },
    { number: 'Lab-B', type: 'lab', capacity: 30, equipment: ['Computers', 'Projector'], building: 'Science Block', floor: 2 }
  ]);

  // Timetable Entries
  await TimetableEntry.deleteMany({});
  await TimetableEntry.insertMany([
    { course: 'B.Sc. Computer Science', year: '2nd Year', section: 'A', day: 'Monday', timeSlot: '9:00 AM - 10:00 AM', subject: 'Data Structures and Algorithms', subjectCode: 'CS201', subjectType: 'theory', faculty: 'Dr. Amit Singh', room: 'LT-101', createdAt: new Date(), updatedAt: new Date() },
    { course: 'BMS', year: '2nd Year', section: 'A', day: 'Tuesday', timeSlot: '10:00 AM - 11:00 AM', subject: 'Financial Management', subjectCode: 'FN101', subjectType: 'theory', faculty: 'Prof. Priya Sharma', room: 'LT-101', createdAt: new Date(), updatedAt: new Date() }
  ]);

  console.log('Sample data inserted!');
  mongoose.disconnect();
}

seed();
