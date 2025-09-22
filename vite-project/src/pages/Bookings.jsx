import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import movies from "../data/Movies.js";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded shadow-lg z-50 flex items-center transition transform ease-out duration-300"
      role="alert"
      aria-live="assertive"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold hover:text-indigo-300 focus:outline-none"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [fadingOutIndex, setFadingOutIndex] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const navigate = useNavigate();

  // Load & sort bookings
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("bookings")) || [];

      // Sort bookings by date & time (latest first)
      const sorted = stored.sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateB - dateA;
      });

      setBookings(sorted);
    } catch {
      setBookings([]);
    }
  }, []);

  const showToast = (msg) => setToastMsg(msg);

  const handleCancel = (index) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    setFadingOutIndex(index);

    setTimeout(() => {
      const updated = bookings.filter((_, i) => i !== index);
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
      setFadingOutIndex(null);
      showToast("Booking cancelled successfully!");
    }, 400);
  };

  const handleEdit = (index) => {
    const booking = bookings[index];
    localStorage.setItem("editBooking", JSON.stringify(booking));
    localStorage.setItem("editIndex", index);
    navigate(`/booking/${booking.movieId}`);
  };

  // Filter bookings (by name or movie title)
  const filteredBookings = useMemo(() => {
    const search = filterText.toLowerCase();
    return bookings.filter((booking) => {
      const movie = movies.find((m) => m.id === booking.movieId);
      return (
        booking.name.toLowerCase().includes(search) ||
        (movie?.title.toLowerCase().includes(search) ?? false)
      );
    });
  }, [bookings, filterText]);

  if (bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-gray-400 text-lg italic mb-4">You have no bookings yet.</p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
          aria-label="Go to home"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 text-center sm:text-left">
          My Bookings
        </h2>

        {/* Search Input */}
        <div className="mb-8 max-w-md mx-auto sm:mx-0">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by movie title or your name..."
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            aria-label="Search bookings"
          />
        </div>

        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500 italic">No bookings match your search.</p>
          ) : (
            filteredBookings.map((booking, index) => {
              const movie = movies.find((m) => m.id === booking.movieId);
              const isFadingOut = fadingOutIndex === index;
              const isLatest = index === 0; // First booking is the latest one

              return (
                <article
                  key={index}
                  tabIndex={0}
                  aria-label={`Booking for ${movie?.title || "Unknown Movie"}`}
                  className={`relative flex flex-col sm:flex-row sm:items-center bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out
                    ${isFadingOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}
                    hover:scale-[1.02] hover:shadow-2xl
                    ${isLatest ? "border-4 border-indigo-600" : ""}`}
                >
                  {/* Current Booking Badge */}
                  {isLatest && (
                    <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      Current Booking
                    </span>
                  )}

                  <img
                    src={movie?.poster || "https://via.placeholder.com/150x210?text=No+Image"}
                    alt={movie?.title || "Unknown Movie Poster"}
                    className="w-full sm:w-40 h-56 object-cover flex-shrink-0"
                  />

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {movie?.title || "Unknown Movie"}
                      </h3>
                      <div className="mt-2 text-gray-600 space-y-1 text-sm sm:text-base">
                        <p><strong>Name:</strong> {booking.name}</p>
                        <p><strong>Email:</strong> {booking.email}</p>
                        <p>
                          <strong>Seats:</strong>{" "}
                          {Array.isArray(booking.seats)
                            ? booking.seats.join(", ")
                            : booking.seats || "N/A"}
                        </p>
                        <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                        <p><strong>Date:</strong> {booking.date}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="flex-1 sm:flex-none bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded shadow-md transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1"
                        aria-label={`Edit booking for ${movie?.title || "unknown movie"}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancel(index)}
                        className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded shadow-md transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                        aria-label={`Cancel booking for ${movie?.title || "unknown movie"}`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            aria-label="Back to home"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </>
  );
};

export default Bookings;
