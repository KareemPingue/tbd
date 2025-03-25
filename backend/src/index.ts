import express, {
    Express,
    Request,
    Response,
    Router,
    RequestHandler,
    NextFunction // Import NextFunction
} from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Explicitly type the app as Express
const app: Express = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// Explicitly typed route handler
const registerHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {  // Added 'next' and NextFunction
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ username, email, password: hashedPassword });
        res.status(201).json({ message: "User registered", user: newUser });
    } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
    }
};

// Explicitly typed route handler
const loginHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => { // Added 'next' and NextFunction
    try {
        const { username, password } = req.body;

        // Simulate authentication (Replace with your actual logic)
        if (username === "admin" && password === "password") {
             res.status(200).json({ message: "Login successful" });  // Changed to not return
        } else {
             res.status(401).json({ error: "Invalid credentials" }); // Changed to not return
        }
    } catch (error) {
        next(error); // Pass the error to the next middleware (error handler)
    }
};

// Apply routes using typed handlers
app.post("/api/register", registerHandler);
app.post("/api/login", loginHandler);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err.stack); // Log the error stack for debugging
    res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));