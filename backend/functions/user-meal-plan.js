import serverless from "serverless-http";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import connectDB from "../config/db.js";
import {
	createUserMealPlan,
	getUserMealPlan,
	updateUserMealPlan,
} from "../controllers/UserMealPlanController.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.post("/meal-plan", protect, createUserMealPlan);
app.put("/meal-plan", protect, updateUserMealPlan);
app.get("/meal-plan/:date", protect, getUserMealPlan);

export const handler = serverless(app);
