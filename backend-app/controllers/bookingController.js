import Booking from "../models/Booking.js";

// Create booking
const createBooking = async (req, res) => {
  const { movieId, seats } = req.body;

  const booking = await Booking.create({
    user: req.user._id,
    movie: movieId,
    seats,
  });

  res.status(201).json(booking);
};

// Get user bookings
const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).populate("movie");
  res.json(bookings);
};

export { createBooking, getUserBookings };
