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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editBookingId, setEditBookingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch movie details dynamically
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies/${id}`);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie:", error);
      }
    };
    fetchMovie();
  }, [id]);

  // ✅ Fetch booked seats for this movie
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings/${id}`);
        setBookedSeats(data.bookedSeats || []);
      } catch (error) {
        console.error("Failed to fetch booked seats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookedSeats();
  }, [id]);

  // ✅ Load booking from edit mode (if any)
  useEffect(() => {
    const editBooking = JSON.parse(localStorage.getItem("editBooking"));
    if (editBooking && editBooking.movieId === id) {
      setName(editBooking.name);
      setEmail(editBooking.email);
      setSelectedSeats(editBooking.seats);
      setIsEditing(true);
      setEditBookingId(editBooking._id);
    }
  }, [id]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const bookingData = {
    movieId: id,
    name,
    email,
    seats: selectedSeats,
    totalPrice: ticketPrice * selectedSeats.length,
  };

  try {
    const token = localStorage.getItem("token"); // 👈 saved after login
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 👈 REQUIRED
      },
    };

    if (isEditing && editBookingId) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/bookings/${editBookingId}`,
        bookingData,
        config
      );
      localStorage.setItem("bookingUpdated", "updated");
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        bookingData,
        config
      );
      localStorage.setItem("bookingUpdated", "added");
    }

    setSuccessMessage(isEditing ? "Booking updated successfully!" : "Booking successful!");
    setTimeout(() => navigate("/bookings"), 1500);
  } catch (error) {
    console.error("Booking failed:", error);
    if (error.response?.status === 401) {
      alert("Please log in before booking tickets.");
    } else {
      alert("Something went wrong while processing your booking.");
    }
  }
};


  if (loading) {
    return <div className="text-center text-gray-600 mt-10">Loading movie details...</div>;
  }

  if (!movie) {
    return <h2 className="text-center text-red-600 mt-10">Movie not found!</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
        {isEditing ? "Edit Your Booking" : "Book Your Tickets"}
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 text-center">
          <img
            src={movie.poster?.url || "https://via.placeholder.com/400x600?text=No+Image"}
            alt={movie.title}
            className="rounded-lg shadow-md w-full object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">{movie.title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="md:w-2/3 space-y-5" autoComplete="off" noValidate>
          <div>
            <label className="block font-semibold mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Select Seats</label>
            <SeatSelector
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bookedSeats={bookedSeats}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
            <div><span className="font-semibold">Tickets:</span> {selectedSeats.length}</div>
            <div><span className="font-semibold">Price per Ticket:</span> ₹{ticketPrice}</div>
            <div className="col-span-2 text-right text-xl font-bold text-indigo-600">
              Total: ₹{ticketPrice * selectedSeats.length}
            </div>
          </div>

          {successMessage && (
            <div className="p-3 bg-green-100 text-green-800 rounded-md font-semibold text-center animate-fadeIn">
              {successMessage}
            </div>
          )}

          <div className="flex flex-wrap gap-4 justify-between">
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition">
              {isEditing ? "Update Booking" : "Confirm Booking"}
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
