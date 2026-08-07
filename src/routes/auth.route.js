
//All routes for (login,register,getme and logoutuser) Authentication

import express from "express";
import { registerUser, loginUser, logoutUser, getMe, refreshAccessToken } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { sendOTPsignup } from "../utils/sendemail.js";
import { verifyOTP } from "../utils/verify.email.js";
import rateLimit from "express-rate-limit";


const router = express.Router();

export const LoginLimiter = rateLimit({
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

export const signupLimitter = rateLimit({
    windowMs: 7 * 60 * 1000,
    limit: 7,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        success: false,
        message: "Too many signup attempts. Please try again after 7 minutes."
    }
})

export const getMeLimiter = rateLimit({
    windowMs: 4 * 60 * 1000, 
    limit: 200,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        success: false,
        message: "Wait for sometime"
    }
});


// Public routes
router.post("/signup", signupLimitter, registerUser);
router.post("/login", loginUser, loginUser);
router.post("/refresh", refreshAccessToken)
//router.post("/send-otp/login", sendOTPlogin)
router.post("/send-otp/signup", sendOTPsignup)
router.post("/verify-otp", verifyOTP)



// Protected routes
router.post("/logout", authMiddleware, logoutUser);
router.get("/me", getMeLimiter, authMiddleware, getMe);

export default router;