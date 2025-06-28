const nodemailer = require('nodemailer');
require('dotenv').config();

console.log('Testing email functionality...');
console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_PASS:', process.env.GMAIL_PASS ? '***SET***' : 'NOT SET');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_USER,
  subject: 'Test Email - Quote Request System',
  text: `Test email from your quote request system!

This is a test to verify your email configuration is working.

Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

If you receive this email, your setup is working correctly!
`,
};

async function testEmail() {
  try {
    console.log('Attempting to send test email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Check your Gmail inbox for the test email.');
  } catch (error) {
    console.error('❌ Error sending email:');
    console.error(error.message);
    if (error.code === 'EAUTH') {
      console.error('Authentication failed. Check your Gmail credentials and App Password.');
    }
  }
}

testEmail(); 