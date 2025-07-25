import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  const handleCancel = (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    const booking = bookings[index];
    localStorage.setItem("editBooking", JSON.stringify(booking));
    localStorage.setItem("editIndex", index);

    // ✅ Go to BookingForm with correct movie ID
    navigate(`/booking/${booking.movieId}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        bookings.map((booking, index) => (
          <div
            key={index}
            className="border p-4 rounded mb-4 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={booking.poster}
                alt={booking.movieTitle}
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <h3 className="text-xl font-semibold">{booking.movieTitle}</h3>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Email:</strong> {booking.email}</p>
                <p><strong>Seats:</strong> {booking.seats.join(", ")}</p>
                <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleCancel(index)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;
