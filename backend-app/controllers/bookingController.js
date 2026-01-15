import asyncHandler from "express-async-handler";
import Booking from "../models/Booking.js";

/**
 *  Create a new booking
 * - Prevents booking already reserved seats
 * - Saves new booking under logged-in user
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { movie, seats, totalPrice } = req.body;

  if (!movie || !Array.isArray(seats) || seats.length === 0) {
    res.status(400);
    throw new Error("Movie and seats are required");
  }

  //  Check if any selected seats are already booked
  const existingBookings = await Booking.find({ movie, seats: { $in: seats } });
  if (existingBookings.length > 0) {
    const takenSeats = existingBookings.flatMap((b) => b.seats);
    return res.status(400).json({
      message: "Some selected seats are already booked",
      takenSeats,
    });
  }

  //  Create booking
  const booking = await Booking.create({
    user: req.user._id,
    movie,
    seats,
    totalPrice: totalPrice || seats.length * 250, // fallback price
  });

  res.status(201).json(booking);
});

/**
 *  Get bookings for logged-in user
 */
export const getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("movie");
  res.json(bookings);
});

/**
 *  Get all booked seats for a specific movie
 * - Used by SeatSelector in the frontend
 */
export const getBookedSeats = asyncHandler(async (req, res) => {
  const { movieId } = req.params;

  const bookings = await Booking.find({ movie: movieId });
  const bookedSeats = bookings.flatMap((b) => b.seats);

  res.json({ bookedSeats });
});
