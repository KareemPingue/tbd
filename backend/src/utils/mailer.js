const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: './src/.env' });

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendResetEmail = async (email, token) => {
  try {
    // Define email options
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password.</p>`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendResetEmail;
