import dotenv from "dotenv";
dotenv.config();

console.log("URI =", process.env.MONGO_URI);
import process from "process";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  authRoutes
);

app.get("/", (req, res) => {
  res.send(
    "Backend Running Successfully"
  );
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err.message);
});
console.log(process.env.MONGO_URI);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});