import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { connect_db } from "./src/model/db.js";

import authRoutes from "./src/routes/auth.route.js";
import eventRoutes from "./src/routes/event.route.js";
import teamRoutes from "./src/routes/teams.routes.js";
import scheduleRoutes from "./src/routes/schedule.route.js";
import userRoutes from "./src/routes/user.routes.js";
import uploadRoutes from "./src/routes/upload.route.js";
import paymentRoutes from "./src/routes/payment.route.js";

import { responseFormatterMiddleware } from "./src/middleware/responseFormatter.middleware.js";

const app = express();

//global APi-limiter
export const apiLimiter = rateLimit({
    windowMs: 7 * 60 * 1000,
    limit: 80,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        success: false,
        message: "Bro... relax 😂. You have officially scared the server."
    }
});

//auth APi-limiter
export const authLimiter = rateLimit({
    windowMs: 7 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        success: false,
        message: "Too many login attempts. Please try again after 7 minutes."
    }
});

// Basic middlewares
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


app.get("/",authLimiter, (req, res) => {
    res.send("Server is running.");
});


// API routes
app.use(apiLimiter)
app.use(authLimiter)
app.use("/api/v1/auth", authLimiter,authRoutes);
app.use("/api/v1/events",apiLimiter, eventRoutes);
app.use("/api/v1/teams", apiLimiter,teamRoutes);
app.use("/api/v1/schedule",apiLimiter, scheduleRoutes);
app.use("/api/v1/user", apiLimiter,userRoutes);
app.use("/api/v1/upload",apiLimiter, uploadRoutes);
app.use("/api/v1/payment", apiLimiter,paymentRoutes);

export default app;