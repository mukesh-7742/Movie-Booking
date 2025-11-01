import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-indigo-600 text-white px-5 py-3 rounded shadow-lg z-50 flex items-center transition transform ease-out duration-300">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 font-bold hover:text-indigo-300">
        ×
      </button>
    </div>
  );
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [toastMsg, setToastMsg] = useState(null);
  const [fadingOutIndex, setFadingOutIndex] = useState(null);
  const navigate = useNavigate();

  // 🧩 Fetch all movies for mapping
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies`);
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };
    fetchMovies();
  }, []);

  // 🧾 Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming login stores JWT
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sorted = res.data.sort(
          (a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
        );
        setBookings(sorted);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setBookings([]);
      }
    };
    fetchBookings();
  }, []);

  const showToast = (msg) => setToastMsg(msg);

  const handleCancel = async (index, id) => {
    if (!window.confirm("Cancel this booking?")) return;
    setFadingOutIndex(index);

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTimeout(() => {
        const updated = bookings.filter((_, i) => i !== index);
        setBookings(updated);
        setFadingOutIndex(null);
        showToast("Booking cancelled!");
      }, 400);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      setFadingOutIndex(null);
      showToast("Failed to cancel booking.");
    }
  };

  const handleEdit = (index) => {
    const booking = bookings[index];
    localStorage.setItem("editBooking", JSON.stringify(booking));
    localStorage.setItem("editIndex", index);
    navigate(`/booking/${booking.movieId}`);
  };

  // 🔍 Filter by user name or movie title
  const filteredBookings = useMemo(() => {
    const search = filterText.toLowerCase();
    return bookings.filter((booking) => {
      const movie = movies.find((m) => m._id === booking.movieId);
      return (
        booking.name.toLowerCase().includes(search) ||
        (movie?.title.toLowerCase().includes(search) ?? false)
      );
    });
  }, [bookings, filterText, movies]);

  // 🕳 No bookings case
  if (bookings.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <p className="text-gray-400 text-lg italic mb-4">You have no bookings yet.</p>
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    );

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold mb-6 text-indigo-700 text-center sm:text-left">
          My Bookings
        </h2>

        {/* Search bar */}
        <div className="mb-8 max-w-md mx-auto sm:mx-0">
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search by movie title or your name..."
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Booking list */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <p className="text-center text-gray-500 italic">No bookings match your search.</p>
          ) : (
            filteredBookings.map((booking, index) => {
              const movie = movies.find((m) => m._id === booking.movieId);
              const isFadingOut = fadingOutIndex === index;
              const isLatest = index === 0;

              return (
                <article
                  key={booking._id}
                  className={`relative flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 ${
                    isFadingOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  } hover:scale-[1.02] hover:shadow-2xl ${
                    isLatest ? "border-4 border-indigo-600" : ""
                  }`}
                >
                  {isLatest && (
                    <span className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Current Booking
                    </span>
                  )}

                  <img
                    src={movie?.poster?.url || "https://placehold.co/150x210?text=No+Image"}
                    alt={movie?.title || "Unknown Movie"}
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
                        <p><strong>Seats:</strong> {Array.isArray(booking.seats) ? booking.seats.join(", ") : booking.seats}</p>
                        <p><strong>Total Price:</strong> ₹{booking.totalPrice}</p>
                        <p><strong>Date:</strong> {booking.date}</p>
                        <p><strong>Time:</strong> {booking.time}</p>
                      </div>
                    </div>

                    <div className="mt-6 sm:mt-4 flex gap-3">
                      <button
                        onClick={() => handleEdit(index)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCancel(index, booking._id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
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

        {/* Back to Home */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-md shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Toast message */}
      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </>
  );
};

export default Bookings;
