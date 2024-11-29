import express from "express";
const router = express.Router();

import {
	createUserMealPlan,
	getUserMealPlan,
	updateUserMealPlan,
} from "../controllers/UserMealPlanController.js";

import { protect } from "../middleware/authMiddleware.js";

// Route to create a user meal plan (protected)
router.post("/meal-plan", protect, createUserMealPlan);

// Route to update a user meal plan (protected)
router.put("/meal-plan", protect, updateUserMealPlan);

// Route to get a user meal plan for a specific date (protected)
router.get("/meal-plan/:date", protect, getUserMealPlan);

export default router;
