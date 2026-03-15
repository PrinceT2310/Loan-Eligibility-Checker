import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // console.log("ENV CHECK:", process.env.MONGO_URI);   // ⭐ ADD THIS

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("DB ERROR:", error.message);
        process.exit(1);
    }
};

export default connectDB;