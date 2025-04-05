import User from "../model/user.model.js";
import cron from "node-cron";

// Function to reset credits for all users
const resetCredits = async () => {
    try {
        const users = await User.find({});
        const updatePromises = users.map(user => {
            return User.findByIdAndUpdate(
                user._id,
                { 
                    $set: { 
                        credits: 20, // Reset to default 20 credits
                        lastCreditReset: new Date()
                    }
                }
            );
        });

        await Promise.all(updatePromises);
        console.log("Credits reset successfully for all users");
    } catch (error) {
        console.error("Error resetting credits:", error);
    }
};

// Schedule credit reset to run every 24 hours
export const scheduleCreditReset = () => {
    // Run at midnight every day
    cron.schedule('0 0 * * *', async () => {
        console.log("Running scheduled credit reset...");
        await resetCredits();
    });
};

// Function to check if user needs credit reset
export const checkCreditReset = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const now = new Date();
        const lastReset = user.lastCreditReset || new Date(0);
        const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);

        if (hoursSinceReset >= 24) {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    credits: 20,
                    lastCreditReset: now
                }
            });
            return true;
        }

        return false;
    } catch (error) {
        console.error("Error checking credit reset:", error);
        throw error;
    }
}; 