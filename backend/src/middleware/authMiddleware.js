const jwt = require('jsonwebtoken');
const pool = require('../db');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        // Check if token is blacklisted
        const [tokens] = await pool.execute('SELECT id FROM BlacklistedTokens WHERE token = ?', [token]);

        if (tokens.length > 0) return res.status(403).json({ message: 'Token is blacklisted' });

        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
};

module.exports = verifyToken;
