import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Import Routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Allow requests from this origin
  credentials: true, // Allow credentials (cookies, etc.)
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handle preflight requests
app.options("*", cors(corsOptions));

// Routers
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

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
  res.send("hello world");
});

// Connect to the database
async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGOOSE_CONNECT_URL);
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
}
ConnectDB();

// Start the server
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  }
});
