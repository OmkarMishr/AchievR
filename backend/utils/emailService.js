const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendActivityApprovedEmail(student, activity) {
  try {
    await transporter.sendMail({
      to: student.email,
      subject: '✅ Your Activity Has Been Approved!',
      html: `
        <h2>Great News, ${student.name}!</h2>
        <p>Your activity "<strong>${activity.title}</strong>" has been approved by faculty.</p>
        <p>Admin will now certify it and generate your blockchain certificate.</p>
        <p><a href="${process.env.FRONTEND_URL}/dashboard" style="background: #3B82F6; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">View in Dashboard</a></p>
      `
    });
    console.log('✅ Email sent to', student.email);
  } catch (error) {
    console.error('Email Error:', error);
  }
}

async function sendCertificateIssuedEmail(student, certificateId) {
  try {
    await transporter.sendMail({
      to: student.email,
      subject: 'Your Certificate is Ready!',
      html: `
        <h2>Certificate Issued</h2>
        <p>Your achievement has been certified with blockchain verification!</p>
        <p>Download your certificate and share it on LinkedIn.</p>
        <p><a href="${process.env.FRONTEND_URL}/dashboard" style="background: #10B981; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Download Now</a></p>
      `
    });
    console.log('Certificate email sent to', student.email);
  } catch (error) {
    console.error('Email Error:', error);
  }
}

module.exports = { sendActivityApprovedEmail, sendCertificateIssuedEmail };