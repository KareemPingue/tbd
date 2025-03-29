const express = require('express');
const bcrypt = require('bcryptjs'); // Declared here once
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

// Removed the second declaration of bcrypt
// const bcrypt = require('bcryptjs'); // Assuming you're using bcryptjs for password hashing
// const User = require('./User'); // Assuming this is your Mongoose User model
// const { pool } = require('./db'); // Assuming this is your MySQL connection pool

// Register Handler
const registerHandler = async (req, res, next) => {
    try {
        console.log("registerHandler: Request body:", req.body); // Log the request body

        const { email, password } = req.body;

        // Basic validation (you should add more robust validation)
        if (!email || !password) {
            console.log("registerHandler: Validation failed - Email and password are required.");
            return res.status(400).json({ error: "Email and password are required." });
        }

        console.log("registerHandler: Hashing password...");
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("registerHandler: Password hashed successfully.");

        console.log("registerHandler: Creating new user in MongoDB...");
        // Create the new user in MongoDB
        const newUser = await User.create({ email, password_hash: hashedPassword });
        console.log("registerHandler: New user created in MongoDB:", newUser);

        console.log("registerHandler: Logging user registration in MySQL...");
        // Log the user registration in MySQL
        await pool.execute(
            "INSERT INTO UserLogs (user_id, action) VALUES (?, ?)",
            [newUser._id, "User Registered"]
        );
        console.log("registerHandler: User registration logged in MySQL.");

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        console.error("Error in registerHandler:", error); // Log the full error object

        // Handle specific MongoDB errors
        if (error.name === 'MongoServerError' && error.code === 11000) {
            if (error.keyPattern && error.keyPattern.email) {
                console.error("registerHandler: Duplicate email error.");
                return res.status(409).json({ error: "Email already exists." });
            } else {
                console.error("registerHandler: Duplicate key error.");
                return res.status(409).json({ error: "Duplicate key error." });
            }
        }

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            console.error("registerHandler: Mongoose validation error.");
            return res.status(400).json({ error: error.message });
        }

        // Handle MySQL errors
        if (error.code === 'ER_DUP_ENTRY') {
            console.error("registerHandler: MySQL duplicate entry error.");
            return res.status(409).json({ error: "Duplicate entry in MySQL." });
        }
        // Handle MySQL table not found error
        if (error.code === 'ER_NO_SUCH_TABLE') {
            console.error("registerHandler: MySQL table not found error.");
            return res.status(500).json({ error: "MySQL table not found." });
        }

        // Handle bcrypt errors
        if (error.message.includes('bcrypt')) {
            console.error("registerHandler: bcrypt error.");
            return res.status(500).json({ error: "Password hashing error." });
        }

        // Generic error handling
        console.error("registerHandler: Unhandled error.");
        res.status(500).json({ error: "Internal server error." });
        next(error); // Pass the error to the next error-handling middleware
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
