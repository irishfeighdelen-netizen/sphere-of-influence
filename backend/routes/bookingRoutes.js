import express from "express";
import {createBooking, getBookings, cancelBooking} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// mentee books a mentor availability slot
router.post("/", authMiddleware, createBooking);

// mentor/mentee view their bookings
router.get("/", authMiddleware, getBookings);

// mentor cancels booking/session
router.put("/:id/cancel", authMiddleware, cancelBooking);

export default router;