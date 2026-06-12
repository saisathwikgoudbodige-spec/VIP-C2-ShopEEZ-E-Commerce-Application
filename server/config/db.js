import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not crash the server in local development if mongo is not running
    // Instead print warning and allow running in offline/mock mode
    console.warn('⚠️ Could not connect to MongoDB. Ensure local MongoDB is running or configure MONGO_URI.');
  }
};

export default connectDB;
