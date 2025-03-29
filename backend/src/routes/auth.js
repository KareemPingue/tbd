const express = require('express');
const crypto = require('crypto');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken');
const sendResetEmail = require('../utils/mailer'); // Now it should find it

const router = express.Router();

// Forgot Password Route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email is required' });

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1-hour expiry

    await PasswordResetToken.create({
      userId: user._id,
      token,
      expiresAt,
    });

    await sendResetEmail(email, token);

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Check if token exists and is valid
        const resetToken = await PasswordResetToken.findOne({ token, expiresAt: { $gt: new Date() } });

        if (!resetToken) return res.status(400).json({ message: 'Invalid or expired token' });

        const userId = resetToken.userId;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await User.updateOne({ _id: userId }, { password_hash: hashedPassword });

        // Delete used token
        await PasswordResetToken.deleteOne({ token });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: error.message, message: 'Password reset failed' });
    }
});

module.exports = router;
