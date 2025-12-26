import mongoose from "mongoose";

// Cache the connection to prevent multiple connections in dev mode
let isConnected = false;

export default async function dbConnect() {
  if (isConnected) {
    console.log("Using existing DB connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to:", db.connection.host);
  } catch (error: any) {
    // This line will print the EXACT reason in your VS Code terminal
    console.error("DETAILED MONGO ERROR:", error.message);
    throw error;
  }
}
