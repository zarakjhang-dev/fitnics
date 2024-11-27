import serverless from "serverless-http";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import connectDB from "../config/db.js";
import {
	registerUser,
	authUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
} from "../controllers/userController.js";
import {
	logWaterIntake,
	updateWaterIntake,
	getUserWaterIntake,
} from "../controllers/userWaterIntakeController.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.post("/", registerUser);
app.post("/auth", authUser);
app.post("/logout", logoutUser);

app.get("/profile", protect, getUserProfile);
app.put("/profile", protect, updateUserProfile);

app.post("/water-intake", protect, logWaterIntake);
app.put("/water-intake", protect, updateWaterIntake);
app.get("/water-intake/:date", protect, getUserWaterIntake);

export const handler = serverless(app);
