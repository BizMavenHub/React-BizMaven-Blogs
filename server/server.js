import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// Import Routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Router
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

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

ConnectDB();

app.listen(process.env.PORT, (err) => {
  if (err) {
    return err;
  }
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});

async function ConnectDB() {
  try {
    mongoose
      .connect(process.env.MONGOOSE_CONNECT_URL)
      .then(() => {
        console.log("connected to database");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
}
