const nodemailer = require('nodemailer');
// Load environment variables from .env in local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('[API] send-quote-email loaded');

// Configure transporter with Gmail credentials from environment variables
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

module.exports = async (req, res) => {
  console.log('[API] send-quote-email called');
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('[API] Request body:', req.body);

  const {
    client_name,
    client_email,
    client_phone,
    selected_package,
    package_name,
    project_details,
    domain_hosting_added,
    additional_cost,
  } = req.body;

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Quote Request - ${package_name}`,
    text: `New Quote Request Received!\n\nCLIENT INFORMATION:\n- Name: ${client_name}\n- Email: ${client_email}\n- Phone: ${client_phone}\n\nPACKAGE DETAILS:\n- Selected Package: ${package_name}\n- Package ID: ${selected_package}\n- Domain & Hosting Package: ${domain_hosting_added ? 'YES (+₹10,500)' : 'NO'}\n- Additional Cost: ${additional_cost}\n\nPROJECT DETAILS:\n${project_details || 'No additional details provided'}\n\nSUBMISSION TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' })}\n\nPlease respond to the client within 24 hours.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[API] Email sent:', info);
    return res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('[API] Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
  }
}; 