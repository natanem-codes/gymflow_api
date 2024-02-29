import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.mjs";
import exerciseRoutes from "./routes/exercise.mjs";
import workoutRoutes from "./routes/workout.mjs";
import userRoutes from "./routes/user.mjs";
import workoutSessionRoutes from "./routes/workoutSession.mjs";

dotenv.config();

import "./utills/db.mjs";
import { verify } from "./middlewares/auth.mjs";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/users", userRoutes);
app.use("/api/workouts", verify, workoutRoutes);
app.use("/api/workoutSessions", verify, workoutSessionRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, (error) => {
  if (error) {
    console.error(error.message);
  }
  console.log(`Server is running on port ${port}`);
});
