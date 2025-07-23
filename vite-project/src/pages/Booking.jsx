import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data.reverse()); // Show latest booking first
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <Helmet>
        <title>My Bookings | Movie Booking App</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-2 text-indigo-700">🎟 My Bookings</h2>
      <p className="text-sm text-gray-600 mb-6 text-center">Here’s a list of your recent bookings.</p>

      <div className="mb-6">
        <Link to="/movies">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            &larr; Back to Movies
          </button>
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p className="text-gray-500 mt-4">No bookings found.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-gray-200 shadow rounded-lg p-4"
            >
              <h3 className="text-lg font-semibold text-indigo-800">{booking.movieTitle}</h3>
              <p className="text-gray-700 mt-1"><strong>Name:</strong> {booking.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {booking.email}</p>
              <p className="text-gray-700"><strong>Seats:</strong> {booking.seats}</p>
              <p className="text-gray-500 text-sm mt-1">
                <strong>Booked on:</strong> {new Date(booking.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
