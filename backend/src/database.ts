import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const startServer = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

startServer();
