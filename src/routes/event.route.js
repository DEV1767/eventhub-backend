
//All routes for event management(event create,get event, getsingleevent, upateevent, deletevent)

import express from "express"
import { validate } from "../middleware/validate.js"
import { Createevent, getevent, getsingleevent, updateevent, deleteevent, eventRules, updateEventInfo, getEventRemainingDays, globalevent } from "../controller/event.controller.js"
import { createeventschema, EventInfoSchema, EventRules } from "../validators/joi.validate.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authorized } from "../middleware/role.middleware.js"
import rateLimit from "express-rate-limit"
import app from "../../app.js"

const router = express.Router()
const commonOptions = {
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
};

export const readLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 250,
    message: {
        success: false,
        message: "You're browsing events a little too enthusiastically 😂"
    }
});

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

export const deleteLimiter = rateLimit({
    ...commonOptions,
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: {
        success: false,
        message: "Deleting events like Thanos? 🫰 Slow down."
    }
});



//routes
router.post("/", createLimiter, authMiddleware, authorized("Organiser", "Faculty"), validate(createeventschema), Createevent);

router.put("/:eventId/rules", updateLimiter, authMiddleware, authorized("Organiser", "Faculty"), validate(EventRules), eventRules);

router.put("/:eventId/info", updateLimiter, authMiddleware, authorized("Organiser", "Faculty"), validate(EventInfoSchema), updateEventInfo);

router.put("/:id", updateLimiter, authMiddleware, authorized("Organiser", "Faculty"), updateevent);

router.delete("/:id", deleteLimiter, authMiddleware, authorized("Organiser", "Faculty"), deleteevent);

router.get("/", readLimiter, authMiddleware, getevent);

router.get("/all", readLimiter, globalevent);

router.get("/:id", readLimiter, authMiddleware, getsingleevent);

router.get("/:eventId/remaining-days", readLimiter, authMiddleware, getEventRemainingDays);

export default router