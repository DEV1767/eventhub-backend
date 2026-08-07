import express from "express"
import { upload } from "../middleware/upload.middleware.js"
import { UpiPaymentProof, approveupiPayment, rejectupiPayment, getpaymentstatus } from "../controller/payment.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { authorized } from "../middleware/role.middleware.js"
import rateLimit from "express-rate-limit"


const router = express.Router()

// POST payment proof with image upload
export const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Whoa! 📸 Too many uploads. Give our storage a little break."
    }
});

router.post("/:regId", uploadLimiter, upload.single("image"), authMiddleware, UpiPaymentProof);
router.put("/:regid/approve",authMiddleware, authorized("Organiser", "Faculty"), approveupiPayment);
router.put("/:regid/reject", authMiddleware, authorized("Organiser", "Faculty"), rejectupiPayment);
router.get("/:regid/getstatus", authMiddleware, authorized("Organiser", "Faculty", "Student"), getpaymentstatus);