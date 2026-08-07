import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connect_db } from "./src/model/db.js";
import helmet from "helmet";

import authRoutes from "./src/routes/auth.route.js";
import eventRoutes from "./src/routes/event.route.js";
import teamRoutes from "./src/routes/teams.routes.js";
import scheduleRoutes from "./src/routes/schedule.route.js";
import userRoutes from "./src/routes/user.routes.js";
import uploadRoutes from "./src/routes/upload.route.js";
import paymentRoutes from "./src/routes/payment.route.js";

import { responseFormatterMiddleware } from "./src/middleware/responseFormatter.middleware.js";

const app = express();



// Basic middlewares
app.use(helmet())
app.use(express.json({ limit: "50mb" }));
app.use(
    express.urlencoded({
        extended: true,
        limit: "50mb"
    })
);
app.use(cookieParser());
app.use(
    cors({
        origin: "https://eduhub-eta-coral.vercel.app",
        credentials: true
    })
);


// MongoDB connection middleware
app.use(async (req, res, next) => {
    try {
        await connect_db();
        next();
    } catch (error) {
        console.error("Database connection error:", error);

        return res.status(500).json({
            success: false,
            message: "Database connection failed"
        });
    }
});


// Response middleware
app.use(responseFormatterMiddleware);


// Favicon
app.get("/favicon.ico", (req, res) => {
    res.status(204).end();
});


app.get("/", (req, res) => {
    res.send("Server is running.");
});


// API routes

app.use(authLimiter)
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/events",eventRoutes);
app.use("/api/v1/teams",teamRoutes);
app.use("/api/v1/schedule", scheduleRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/payment",paymentRoutes);

export default app;