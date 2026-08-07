import express from "express"
import { validate } from "../middleware/validate.js"
import { Schedulevalidator } from "../validators/joi.validate.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authorized } from "../middleware/role.middleware.js"
import { addslot, getschedule, updateslot, deleteslot } from "../controller/schedule.controller.js"
import rateLimit from "express-rate-limit"


const router = express.Router()

const commonOptions = {
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
};

// Create Schedule Slot
export const createScheduleLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 15,
    message: {
        success: false,
        message: " Too many schedule slots are being created. Please slow down."
    }
});

// Get Schedule
export const getScheduleLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: {
        success: false,
        message: " You're checking the schedule too frequently. Give the server a moment."
    }
});

// Update Schedule Slot
export const updateScheduleLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 40,
    message: {
        success: false,
        message: " Too many schedule updates. Please wait a bit."
    }
});

// Delete Schedule Slot
export const deleteScheduleLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 15,
    message: {
        success: false,
        message: "Easy there! Too many schedule deletions."
    }
});

router.post("/:eventId", createScheduleLimiter, authMiddleware, authorized("Organiser", "Faculty"), validate(Schedulevalidator), addslot);

router.get("/:eventId", getScheduleLimiter, authMiddleware, getschedule);

router.put("/:eventId/:slotId", updateScheduleLimiter, authMiddleware, authorized("Organiser", "Faculty"), validate(Schedulevalidator), updateslot);

router.delete("/:eventId/:slotId", deleteScheduleLimiter, authMiddleware, authorized("Organiser", "Faculty"), deleteslot);
export default router