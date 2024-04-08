import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import Routes
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Router
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

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
