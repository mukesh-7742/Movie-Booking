// pages/Bookings.jsx
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(saved);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <div key={index} className="p-4 border rounded shadow bg-white">
              <p><strong>Movie:</strong> {booking.movieTitle}</p>
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Seats:</strong> {booking.seats}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
