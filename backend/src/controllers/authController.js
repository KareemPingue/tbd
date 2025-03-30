const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendResetEmail = require("../utils/mailer");
const { generateResetToken, verifyResetToken } = require("../utils/tokenService");

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("forgotPassword: Request received for email:", email);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("forgotPassword: User not found for email:", email);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("forgotPassword: User found:", user.email);
        const resetToken = await generateResetToken(user.id);
        console.log("forgotPassword: Reset token generated:", resetToken);
        await sendResetEmail(user.email, resetToken);
        console.log("forgotPassword: sendResetEmail called successfully");

        res.json({ message: "Password reset link sent!" });
    } catch (error) {
        console.error("forgotPassword: Error in forgotPassword:", error);
        if (error.response) {
            console.error("forgotPassword: SendGrid response:", error.response);
            if (error.response.body && error.response.body.errors) {
                console.error("forgotPassword: SendGrid errors:", JSON.stringify(error.response.body.errors, null, 2));
                // Check for the specific "unverified sender" error
                const sendGridErrors = error.response.body.errors;
                const unverifiedSenderError = sendGridErrors.find(err => err.message.includes("The from address does not match a verified Sender Identity"));
                if (unverifiedSenderError) {
                    return res.status(500).json({ message: "Email sending failed: Unverified sender identity. Please check your SendGrid settings." });
                }
            }
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const userId = await verifyResetToken(token);
        if (!userId) return res.status(400).json({ message: "Invalid or expired token" });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password_hash: hashedPassword });

        res.json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

