import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import path from "path";
import { readdirSync } from "fs";

// Import Routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";

dotenv.config();

const app = express();

const __dirname = path.resolve();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Connect to the database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT_URL, {});
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDB();

// Start the server
const PORT = process.env.PORT || 5000; // Provide a default port if not defined
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server start error:", err);
  } else {
    console.log(`Server is running on http://localhost:${PORT}`);
  }
});
