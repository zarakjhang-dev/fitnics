import serverless from "serverless-http";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import connectDB from "../config/db.js";
import {
	createUserStatus,
	getUserStatus,
	updateUserStatus,
} from "../controllers/userStatusController.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.post("/status", protect, createUserStatus);
app.get("/status", protect, getUserStatus);
app.put("/status", protect, updateUserStatus);

export const handler = serverless(app);
