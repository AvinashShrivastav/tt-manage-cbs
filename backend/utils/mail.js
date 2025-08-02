require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
const logFilePath = path.join(logDir, 'sent_emails.log');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendNotificationEmail = (to, course, year, section) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to.join(','),
    subject: `Timetable Update for ${course} ${year} - Section ${section}`,
    text: 'The timetable has been updated. Please check the portal for the latest schedule.'
  };

  // Log the email
  const logMessage = `[${new Date().toISOString()}] Sent email to: ${to.join(', ')} for ${course} ${year} - Section ${section}\n`;
  fs.appendFileSync(logFilePath, logMessage);

  return transporter.sendMail(mailOptions);
};

module.exports = { sendNotificationEmail };
