
//All routes for team registration(registerteam,getteams,studentownregistration,cancleregistration)

import express from "express"
import { validate } from "../middleware/validate.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { registerevent } from "../validators/joi.validate.js"
import { registerteam, getTeams, studentownregistration, cancleregistration, Approveregistratation, Rejectregistration, getRegistrationsByEvent, checkregistration } from "../controller/teams.controller.js"
import { authorized } from "../middleware/role.middleware.js"
import rateLimit from "express-rate-limit"


const router = express.Router()
const commonOptions = {
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
};

export const createLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        success: false,
        message: "Slow down! Creating too many events isn't allowed."
    }
});

export const updateLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 30,
    message: {
        success: false,
        message: "Too many updates. Give the server a small break."
    }
});

export const readLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: {
        success: false,
        message: "You're browsing events a little too enthusiastically 😂"
    }
});

export const deleteLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        success: false,
        message: "Deleting events like Thanos? 🫰 Slow down."
    }
});

// Register Team
export const registerTeamLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 15,
    message: {
        success: false,
        message: " Too many team registrations! Slow down a little."
    }
});

// Get Registrations
export const getRegistrationsLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: {
        success: false,
        message: " You're checking registrations too frequently."
    }
});

// Get Teams
export const getTeamsLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: {
        success: false,
        message: "🏆Too many team requests. Give the server a break."
    }
});

// My Registrations
export const myRegistrationsLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 150,
    message: {
        success: false,
        message: " Easy there! You're checking your registrations too often."
    }
});

// Check Registration
export const checkRegistrationLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 200,
    message: {
        success: false,
        message: " Too many registration checks."
    }
});

// Approve Registration
export const approveRegistrationLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 30,
    message: {
        success: false,
        message: "Too many approvals. Slow down!"
    }
});

// Reject Registration
export const rejectRegistrationLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 30,
    message: {
        success: false,
        message: " Too many rejections. Give the server a moment."
    }
});

// Cancel Registration
export const cancelRegistrationLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 20,
    message: {
        success: false,
        message: " Too many cancellations. Please wait a bit."
    }
});

// Specific routes MUST come before generic parameter routes
router.post("/register", createLimiter, authMiddleware, validate(registerevent), registerteam);

router.get("/registrations/:eventId", readLimiter, authMiddleware, getRegistrationsByEvent);

router.put("/registrations/:registrationId/approve", updateLimiter, authMiddleware, authorized("Organiser", "Faculty"), Approveregistratation);

router.put("/registrations/:registrationId/reject", updateLimiter, authMiddleware, authorized("Organiser", "Faculty"), Rejectregistration);

router.get("/registrations/mine", readLimiter, authMiddleware, studentownregistration);

router.get("/:id/teams", readLimiter, authMiddleware, authorized("Organiser", "Faculty"), getTeams);

router.get("/checkregistration/:eventId", readLimiter, authMiddleware, checkregistration);

router.delete("/:tid", deleteLimiter, authMiddleware, authorized("Organiser", "Faculty"), cancleregistration);


export default router
