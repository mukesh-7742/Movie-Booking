import express from "express";
import { createBooking, getUserBookings, getBookedSeats } from "../controllers/bookingController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

//  Create booking (protected)
router.post("/", protect, createBooking);

//  Get user's own bookings (protected)
router.get("/mybookings", protect, getUserBookings);

//  Get all booked seats for a specific movie (public)
router.get("/:movieId", getBookedSeats);

export default router;
