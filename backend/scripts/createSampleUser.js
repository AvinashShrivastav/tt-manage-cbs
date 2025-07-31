const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

async function createUser() {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const email = 'test@sscbs.du.ac.in';
  const password = 'test1234';
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log('Sample user created:', email, '/', password);
  } catch (err) {
    console.error('Error creating user:', err.message);
  } finally {
    mongoose.disconnect();
  }
}

createUser();
