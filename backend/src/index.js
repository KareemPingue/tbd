const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file - DO THIS FIRST
dotenv.config();

const pool = require('./db'); // Import after dotenv.config()
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Debugging: Ensure the MongoDB URI is loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/maa_mongo";

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// MySQL Connection
pool.getConnection()
    .then(() => {
        console.log("MySQL Connected");

        // Start the server only after both MongoDB and MySQL are connected
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Graceful shutdown on SIGINT (Ctrl+C)
        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Server closed gracefully');
                Promise.all([mongoose.disconnect(), pool.end()])
                    .then(() => console.log('Disconnected from MongoDB and MySQL'))
                    .catch(err => console.error('Error disconnecting:', err))
                    .finally(() => process.exit(0));
            });
        });

        server.on('error', (err) => {
            console.error('Fatal error starting server:', err);
            Promise.all([mongoose.disconnect(), pool.end()])
                .then(() => console.log('Disconnected due to server error'))
                .catch(err => console.error('Error disconnecting:', err))
                .finally(() => process.exit(1));
        });
    })
    .catch((err) => {
        console.error("MySQL connection error:", err);
        process.exit(1);
    });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in .env");
    process.exit(1);
}

// Login Handler
const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};

// Register Handler
const registerHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in MongoDB
        const newUser = await User.create({ email, password_hash: hashedPassword });

        // Log activity in MySQL
        await pool.execute(
            "INSERT INTO UserLogs (user_id, action) VALUES (?, ?)",
            [newUser._id, "User Registered"]
        );

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        console.error("Error in registerHandler:", error);
        if (error.code === 11000) return res.status(409).json({ error: "Username or email already exists" });
        if (error.name === 'ValidationError') return res.status(400).json({ error: error.message });
        next(error);
    }
};

// Routes
app.post('/api/login', loginHandler);
app.post('/api/register', registerHandler);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);

    let statusCode = 500;
    if (err.name === 'ValidationError') statusCode = 400;
    else if (err.name === 'CastError') statusCode = 400;
    else if (err.code === 11000) statusCode = 409;

    res.status(statusCode).json({ error: 'Something went wrong.' });
});

module.exports = app;
