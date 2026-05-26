import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Success message
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Error message
    console.error(`MongoDB Error: ${error.message}`);

    // Stop server if DB fails
    process.exit(1);
  }
};

export default connectDB;