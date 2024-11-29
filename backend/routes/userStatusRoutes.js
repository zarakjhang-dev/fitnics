import express from "express";
const router = express.Router();

import {
	createUserStatus,
	getUserStatus,
	updateUserStatus,
} from "../controllers/userStatusController.js";

import { protect } from "../middleware/authMiddleware.js";

// Route to create user status (protected)
router.post("/status", protect, createUserStatus);

// Route to get user status (protected)
router.get("/status", protect, getUserStatus);

// Route to update user status (protected)
router.put("/status", protect, updateUserStatus);

export default router;
