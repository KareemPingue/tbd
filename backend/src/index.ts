import express, { Express, Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from "crypto"; // Import crypto
import { ParsedQs } from 'qs';
// import mysql from "mysql2/promise"; // Remove this line
import pool from './db'; // Import the pool from db.js
import authRoutes from './routes/auth'; // Add this line

dotenv.config({ path: './src/.env' }); // Load environment variables from .env

const app: Express = express();
app.use(express.json());

// Debugging: Ensure the MongoDB URI is loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/maa_mongo";

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// // MySQL Connection // Remove this block
// const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
// const MYSQL_USER = process.env.MYSQL_USER || "root";
// const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD; // Removed the default password
// const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "mysql_maa";

// const mysqlConnection = mysql.createPool({
//     host: MYSQL_HOST,
//     user: MYSQL_USER,
//     password: MYSQL_PASSWORD,
//     database: MYSQL_DATABASE,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

pool.getConnection() // Use the pool from db.js
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
                Promise.all([mongoose.disconnect(), pool.end()]) // Use pool.end()
                    .then(() => console.log('Disconnected from MongoDB and MySQL'))
                    .catch(err => console.error('Error disconnecting from MongoDB or MySQL:', err))
                    .finally(() => process.exit(0));
            });
        });

        server.on('error', (err) => {
            console.error('Fatal error starting server:', err);
            Promise.all([mongoose.disconnect(), pool.end()]) // Use pool.end()
                .then(() => console.log('Disconnected from MongoDB and MySQL due to server error'))
                .catch(err => console.error('Error disconnecting from MongoDB or MySQL:', err))
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

// User Schema & Model (MongoDB)
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// Define route handler type
type RouteHandler = (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction) => Promise<void>;

// Login Handler
const loginHandler: RouteHandler = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        next(error);
    }
};

// Register Handler (MongoDB & MySQL)
const registerHandler: RouteHandler = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user in MongoDB
        const newUser = await User.create({ username, email, password: hashedPassword });

        // Log activity in MySQL
        const [result] = await pool.execute( // Use pool here
            "INSERT INTO UserLogs (user_id, action) VALUES (?, ?)",
            [newUser._id, "User Registered"]
        );

        console.log("User activity logged in MySQL:", result);

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        console.error("Error in registerHandler:", error); // Log the full error
        if (error.code === 11000) {
            // MongoDB duplicate key error
            res.status(409).json({ error: "Username or email already exists" });
        } else if (error.name === 'ValidationError') {
            // Mongoose validation error
            res.status(400).json({ error: error.message });
        }
        else {
            next(error); // Pass other errors to the error handling middleware
        }
    }
};

// Forgot Password Handler (MongoDB & MySQL)
const forgotPasswordHandler: RouteHandler = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if user exists in MongoDB
        const user = await User.findOne({ email }); // Use User.findOne to find the user in MongoDB
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 3600000); // 1-hour expiration

        // Store in MySQL
        await pool.execute( // Use pool here
            "INSERT INTO PasswordResetTokens (user_id, token, expires_at) VALUES (?, ?, ?)",
            [user._id, resetToken, expiresAt]
        );

        res.status(200).json({ message: "Password reset token created", token: resetToken });
    } catch (error) {
        console.error("Error in forgotPasswordHandler:", error); // Log the full error
        next(error); // Pass other errors to the error handling middleware
    }
};

// Routes
app.post('/api/login', loginHandler);
app.post('/api/register', registerHandler);
// app.post("/api/auth/forgot-password", forgotPasswordHandler); // Add the forgot password route
app.use('/api/auth', authRoutes); // Add this line

app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack); // Log the full stack trace for debugging

    // Determine the appropriate HTTP status code based on the error
    let statusCode = 500; // Default to Internal Server Error
    if (err.name === 'ValidationError') {
        statusCode = 400; // Bad Request for validation errors
    } else if (err.name === 'CastError') {
        statusCode = 400; // Bad Request for casting errors (e.g., invalid ObjectId)
    } else if (err.code === 11000) {
        statusCode = 409; // Conflict for duplicate key errors
    }

    res.status(statusCode).json({ error: 'Something went wrong.' }); // Send a generic message to the client
});


export default app;
