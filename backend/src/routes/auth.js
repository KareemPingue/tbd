const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Import the pool from db.js
const transporter = require('../config/nodemailer');
const mongoose = require('mongoose'); // Import mongoose
const User = mongoose.model('User'); // Import the User model
// require('dotenv').config(); // Removed this line

const router = express.Router();

// Forgot Password - Generate Reset Token
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        // const [users] = await pool.execute('SELECT id FROM Users WHERE email = ?', [email]); // Use pool here
        // if (users.length === 0) return res.status(404).json({ message: 'User not found' });
        // const userId = users[0].id;
        const user = await User.findOne({ email }); // Use User.findOne to find the user in MongoDB
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        const userId = user._id;

        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min expiry

        // Save token in DB
        await pool.execute( // Use pool here
            'INSERT INTO PasswordResetTokens (user_id, token, expires_at) VALUES (?, ?, ?)',
            [userId, token, expiresAt]
        );

        // Send email
        const resetLink = `http://localhost:3000/reset-password?token=${token}`;
        try {
            await transporter.sendMail({
                to: email,
                subject: 'Password Reset Request',
                text: `Click here to reset your password: ${resetLink}`,
            });
            res.json({ message: 'Password reset link sent to your email' });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            return res.status(500).json({ message: 'Failed to send email', error: emailError.message }); // Return error to client
        }


    } catch (error) {
        console.error('Forgot password error:', error); // Log the error
        res.status(500).json({ error: error.message, message: 'Forgot password process failed.' }); // Send a user-friendly error message
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Check if token exists and is valid
        const [tokens] = await pool.execute( // Use pool here
            'SELECT user_id FROM PasswordResetTokens WHERE token = ? AND expires_at > NOW()',
            [token]
        );

        if (tokens.length === 0) return res.status(400).json({ message: 'Invalid or expired token' });

        const userId = tokens[0].user_id;
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await pool.execute('UPDATE Users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]); // Use pool here

        // Delete used token
        await pool.execute('DELETE FROM PasswordResetTokens WHERE token = ?', [token]); // Use pool here

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ error: error.message, message: 'Password reset failed' });
    }
});

// Logout - Blacklist JWT
router.post('/logout', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' }); // Explicitly handle missing token
    }
    try {
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (jwtError) {
            return res.status(401).json({ message: 'Invalid token', error: jwtError.message }); // Token verification failed
        }

        const expiresAt = new Date(decoded.exp * 1000);
        const userId = decoded.id;  // Assuming 'id' is the user ID claim

        // Store token in blacklist
        await pool.execute('INSERT INTO BlacklistedTokens (user_id, token, expires_at) VALUES (?, ?, ?)', // Use pool here
            [userId, token, expiresAt]
        );

        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: error.message, message: 'Logout failed' });
    }
});

module.exports = router;
