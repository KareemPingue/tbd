const crypto = require('crypto');
const PasswordResetToken = require('../models/PasswordResetToken');

exports.generateResetToken = async (userId) => {
    console.log("generateResetToken: Generating token for user:", userId);
    const token = crypto.randomBytes(32).toString('hex');
    console.log("generateResetToken: Generated token:", token);
    const expiresAt = new Date(Date.now() + 3600000); // 1-hour expiry
    console.log("generateResetToken: Token expires at:", expiresAt);

    try {
        await PasswordResetToken.create({
            userId,
            token,
            expiresAt,
        });
        console.log("generateResetToken: Token created successfully");
    } catch (error) {
        console.error("generateResetToken: Error creating token:", error);
        throw error; // Re-throw the error to be handled by the caller
    }

    return token;
};

exports.verifyResetToken = async (token) => {
    try {
        console.log("verifyResetToken: Verifying token:", token);
        const resetToken = await PasswordResetToken.findOne({ token, expiresAt: { $gt: new Date() } });
        console.log("verifyResetToken: resetToken found:", resetToken);
        if (!resetToken) {
            console.log("verifyResetToken: Token not found or expired:", token);
            return null;
        }

        await PasswordResetToken.deleteOne({ token }); // Delete used token
        console.log("verifyResetToken: Token verified and deleted:", token);
        return resetToken.userId;
    } catch (error) {
        console.error('verifyResetToken: Token verification error:', error);
        return null;
    }
};
