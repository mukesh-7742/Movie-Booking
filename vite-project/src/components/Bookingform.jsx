// components/BookingForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingForm = ({ movie }) => {
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(1);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      movieId: movie.id,
      movieTitle: movie.title,
      name,
      email,
      seats,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    existing.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existing));

    alert("Booking successful!");
    navigate("/bookings");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded w-full max-w-md">
      <p className="text-xl font-semibold mb-4">Movie: {movie.title}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your Name"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        className="w-full mb-3 p-2 border rounded"
        required
      />
      <input
        type="number"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        min={1}
        placeholder="Number of Seats"
        className="w-full mb-4 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded">
        Confirm Booking
      </button>
    </form>
  );
};

export default BookingForm;
