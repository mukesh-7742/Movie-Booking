import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";

// Create booking
export const createBooking = asyncHandler(async (req, res) => {
  const { movie, seats } = req.body;

  const booking = await Booking.create({
    user: req.user._id,
    movie,
    seats,
  });

  res.status(201).json(booking);
});

// Get user bookings
export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("movie");
  res.json(bookings);
});
