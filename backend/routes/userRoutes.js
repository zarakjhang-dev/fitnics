import express from "express";
const router = express.Router();

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

import { protect } from "../middleware/authMiddleware.js";

// Route to register a user
router.post("/", registerUser);

// Route to authenticate a user
router.post("/auth", authUser);

// Route to log out a user
router.post("/logout", logoutUser);

// Routes to get and update user profile (protected)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Routes to log and update water intake (protected)
router.post("/water-intake", protect, logWaterIntake);
router.put("/water-intake", protect, updateWaterIntake);

// Route to get water intake for a specific date (protected)
router.get("/water-intake/:date", protect, getUserWaterIntake);

export default router;
