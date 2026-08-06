import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./src/routes/auth.route.js";
import eventRoutes from "./src/routes/event.route.js";
import teamRoutes from "./src/routes/teams.routes.js"
import scheduleRoutes from "./src/routes/schedule.route.js"
import userRoutes from "./src/routes/user.routes.js"
import { responseFormatterMiddleware } from "./src/middleware/responseFormatter.middleware.js";
import uploadRoutes from "./src/routes/upload.route.js"
import paymentRoutes from "./src/routes/payment.route.js"

const app = express()


//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5500",
        credentials: true
    })
);


//response(middleware)
app.use(responseFormatterMiddleware);

app.get("/Ping", (req, res) => {
    res.send("PONG");
});

// Routes
//auth routes
app.use("/api/v1/auth", authRoutes);
//event-managment routes(reg.,del.,update)
app.use("/api/v1/events", eventRoutes);
//teams routes
app.use("/api/v1/teams", teamRoutes);
//schedule-routes
app.use("/api/v1/schedule", scheduleRoutes);
//user routes
app.use("/api/v1/user", userRoutes);
//upload payment image
app.use("/api/v1/upload", uploadRoutes)
//payments routes
app.use("/api/v1/payment", paymentRoutes)

export default app;