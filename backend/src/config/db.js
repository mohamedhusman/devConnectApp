import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI, {
      dbName: "devconnect",
    });
    console.log("MongoDB connected successfully 🚀");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
