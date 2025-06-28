const fetch = require('node-fetch');

console.log('[API] send-quote-email loaded');

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
  }

  const emailBody = `
New Quote Request Received!

CLIENT INFORMATION:
- Name: ${client_name}
- Email: ${client_email}
- Phone: ${client_phone}

PACKAGE DETAILS:
- Selected Package: ${package_name}
- Package ID: ${selected_package}
- Domain & Hosting Package: ${domain_hosting_added ? 'YES (+₹10,500)' : 'NO'}
- Additional Cost: ${additional_cost}

PROJECT DETAILS:
${project_details || 'No additional details provided'}

SUBMISSION TIME: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' })}

Please respond to the client within 24 hours.
`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        to: 'rsushant583@gmail.com',
        subject: `New Quote Request - ${package_name}`,
        text: emailBody,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send email');
    }

    return res.status(200).json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('[API] Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
  }
}; 