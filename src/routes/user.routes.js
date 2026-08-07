import express from "express"
import { validate } from "../middleware/validate.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { getuser, updateme, updatepassword } from "../controller/user.controller.js"
import rateLimit from "express-rate-limit"

const router = express.Router()

const commonOptions = {
    windowMs: 15 * 60 * 1000,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
};

// Get Current User
export const getUserLimiter = rateLimit({
    ...commonOptions,
    limit: 150,
    message: {
        success: false,
        message: " You're checking your profile a little too often."
    }
});

// Update Profile
export const updateProfileLimiter = rateLimit({
    ...commonOptions,
    limit: 10,
    message: {
        success: false,
        message: " Too many profile updates. Please wait a moment."
    }
});

// Update Password
export const updatePasswordLimiter = rateLimit({
    ...commonOptions,
    limit: 5,
    message: {
        success: false,
        message: " Too many password change attempts. Please try again later."
    }
});

router.get("/me", getUserLimiter, authMiddleware, getuser);

router.put("/updateme", updateProfileLimiter, authMiddleware, updateme);

router.put("/updatepassword", updatePasswordLimiter, authMiddleware, updatepassword);
export default router

