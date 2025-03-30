const sgMail = require('@sendgrid/mail');

// Set the SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetEmail = async (email, token) => {
  try {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const msg = {
      to: email,
      from: {
        email: process.env.SMTP_USER, // Ensure this is correctly set to kareempingue@gmail.com
        name: "Your App Name" // You can add a name here for better branding
      },
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    await sgMail.send(msg);
    console.log('Password reset email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    if (error.response) {
      console.error('SendGrid response:', error.response);
      if (error.response.body && error.response.body.errors) {
        console.error('SendGrid errors:', JSON.stringify(error.response.body.errors, null, 2));
      }
    }
    throw error;
  }
};

module.exports = sendResetEmail;
