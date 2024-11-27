import serverless from "serverless-http";
import express from "express";
import connectDB from "../config/db.js";
import { notFound, errorHandler } from "../middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import UserMealPlanRoutes from "../routes/UserMealPlanRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();

app.use("/api/user", UserMealPlanRoutes);
app.use(notFound);
app.use(errorHandler);

export const handler = serverless(app);
