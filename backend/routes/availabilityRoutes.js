import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createAvailability, getAvailability, updateAvailability, deleteAvailability, getMentorAvailability } from "../controllers/availabilityController.js";


const router = express.Router();

router.post("/", authMiddleware, createAvailability);
router.get("/", authMiddleware, getAvailability);
router.get("/mentor/:mentorId", getMentorAvailability);
router.put("/:id", authMiddleware, updateAvailability);
router.delete("/:id", authMiddleware, deleteAvailability);

export default router;

