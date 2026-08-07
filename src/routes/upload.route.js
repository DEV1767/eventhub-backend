import express from "express"
import { upload } from "../middleware/upload.middleware.js"
import { uploadupiimage } from "../controller/upload.controller.js"
import { authorized } from "../middleware/role.middleware.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import rateLimit from "express-rate-limit"


const router = express.Router()
export const uploadImageLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit:7,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    ipv6Subnet: 56,
    message: {
        success: false,
        message: " Too many image uploads! Give our server a little break."
    }
});






router.post("/",uploadImageLimiter, upload.single("image"), authMiddleware, authorized("Student"),uploadupiimage)

export default router;