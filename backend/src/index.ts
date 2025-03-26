import express, { Express, Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
app.use(express.json());

// Debugging: Ensure the MongoDB URI is loaded correctly
console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI as string, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Ensures connection attempt times out properly
})
    .then(() => {
        console.log("MongoDB Connected");

        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Graceful shutdown on SIGINT (Ctrl+C)
        process.on('SIGINT', () => {
            server.close(() => {
                console.log('Server closed gracefully');
                mongoose.disconnect()
                    .then(() => console.log('Disconnected from MongoDB'))
                    .catch(err => console.error('Error disconnecting from MongoDB:', err));
                process.exit(0);
            });
        });

        server.on('error', (err) => {
            console.error('Fatal error starting server:', err);
            mongoose.disconnect()
                .then(() => console.log('Disconnected from MongoDB due to server error'))
                .catch(err => console.error('Error disconnecting from MongoDB:', err));
            process.exit(1);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        console.error('Failed to connect to MongoDB with URI:', process.env.MONGO_URI);
        process.exit(1);
    });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("JWT_SECRET is not defined in .env");
    process.exit(1);
}

// User Schema & Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// Define route handler type
type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

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

// Register Handler
const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        next(error);
    }
};

// Routes
app.post('/api/login', loginHandler);
app.post('/api/register', registerHandler);

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
    }

    res.status(statusCode).json({ error: 'Something went wrong.' }); // Send a generic message to the client
});

export default app;
