import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SeatSelector from "../components/SeatSelector";

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticketPrice = 200;

  const [movie, setMovie] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  // 🎬 Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/movies/${id}`
        );
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
        setError("Movie not found");
      }
    };
    fetchMovie();
  }, [id]);

  // 💺 Fetch already booked seats for this movie
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/bookings/booked-seats/${id}`
        );
        setBookedSeats(data.bookedSeats || []);
      } catch (error) {
        console.error("Failed to fetch booked seats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedSeats();
  }, [id]);

  // 🎟️ Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const bookingData = {
      movie: id,
      seats: selectedSeats,
      totalPrice: ticketPrice * selectedSeats.length,
    };

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        bookingData,
        config
      );

      setSuccessMessage("🎉 Booking successful!");
      setSelectedSeats([]);

      // Navigate to user's bookings
      setTimeout(() => navigate("/mybookings"), 1500);
    } catch (error) {
      console.error("Booking failed:", error);
      if (error.response?.status === 401) {
        alert("Please log in before booking tickets.");
      } else {
        alert(error.response?.data?.message || "Booking failed. Try again.");
      }
    }
  };

  // 🕓 Loading or Error states
  if (loading) return <p className="text-center mt-10">Loading movie details...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
        Book Your Tickets
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 🎬 Movie Info */}
        <div className="md:w-1/3 text-center">
          <img
            src={movie.poster?.url || "https://placehold.co/400x600?text=No+Image"}
            alt={movie.title}
            className="rounded-lg shadow-md w-full object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">{movie.title}</h3>
        </div>

        {/* 🧾 Booking Form */}
        <form onSubmit={handleSubmit} className="md:w-2/3 space-y-5" autoComplete="off" noValidate>
          <div>
            <label className="block font-semibold mb-1">Select Seats</label>
            <SeatSelector
              movieId={id}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bookedSeats={bookedSeats}
            />
          </div>

          {/* 💰 Pricing Summary */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            <div>
              <span className="font-semibold">Tickets:</span> {selectedSeats.length}
            </div>
            <div>
              <span className="font-semibold">Price per Ticket:</span> ₹{ticketPrice}
            </div>
            <div className="col-span-2 text-right text-xl font-bold text-indigo-600">
              Total: ₹{ticketPrice * selectedSeats.length}
            </div>
          </div>

          {/* ✅ Success message */}
          {successMessage && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md font-semibold text-center">
              {successMessage}
            </div>
          )}

          {/* 🧭 Buttons */}
          <div className="flex flex-wrap gap-4 justify-between">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
            >
              Confirm Booking
            </button>

            <button
              type="button"
              onClick={() => navigate(`/movies/${id}`)}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-md transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
