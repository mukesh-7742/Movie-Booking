import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";
import movies from "../data/Movies.js";

const cleanBookings = (bookings) => {
  if (!Array.isArray(bookings)) return [];
  return bookings.filter(
    (b) =>
      b &&
      typeof b === "object" &&
      "movieId" in b &&
      Array.isArray(b.seats) &&
      b.seats.length > 0
  );
};

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === parseInt(id));
  const ticketPrice = 200;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [resetClicked, setResetClicked] = useState(false); // NEW flag

  // Load booking to edit if exists, skip if reset clicked
  useEffect(() => {
    if (resetClicked) return; // skip loading after reset

    const editBookingRaw = localStorage.getItem("editBooking");
    const indexRaw = localStorage.getItem("editIndex");

    if (editBookingRaw) {
      try {
        const editBooking = JSON.parse(editBookingRaw);
        const index = indexRaw ? parseInt(indexRaw) : null;

        if (editBooking && editBooking.movieId === parseInt(id)) {
          setName(editBooking.name);
          setEmail(editBooking.email);
          setSelectedSeats(editBooking.seats);
          setIsEditing(true);
          setEditIndex(index);
        }
      } catch {
        // ignore corrupted data
      }
    }
  }, [id, resetClicked]);

  // Load all booked seats for this movie to disable in SeatSelector
  useEffect(() => {
    const bookingsRaw = localStorage.getItem("bookings");
    let bookings = bookingsRaw ? JSON.parse(bookingsRaw) : [];
    bookings = cleanBookings(bookings);
    let seats = [];
    bookings.forEach((b, idx) => {
      if (b.movieId === parseInt(id)) {
        if (!(isEditing && editIndex === idx)) {
          seats = seats.concat(b.seats);
        }
      }
    });
    setBookedSeats(seats);
  }, [id, isEditing, editIndex]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("editBooking");
      localStorage.removeItem("editIndex");
    };
  }, []);

  const validateEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const conflictSeat = selectedSeats.find((seat) => bookedSeats.includes(seat));
    if (conflictSeat) {
      alert(`Seat ${conflictSeat} is already booked. Please select other seats.`);
      return;
    }

    const newBooking = {
      movieId: parseInt(id),
      movieTitle: movie.title,
      poster: movie.poster,
      name,
      email,
      seats: selectedSeats,
      ticketPrice,
      totalPrice: ticketPrice * selectedSeats.length,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const existingRaw = localStorage.getItem("bookings");
    let existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing = cleanBookings(existing);

    if (isEditing && editIndex !== null) {
      existing[editIndex] = newBooking;
      localStorage.removeItem("editBooking");
      localStorage.removeItem("editIndex");
    } else {
      existing.push(newBooking);
    }

    localStorage.setItem("bookings", JSON.stringify(existing));

    setSuccessMessage(isEditing ? "Booking updated successfully!" : "Booking successful!");

    if (!isEditing) {
      setName("");
      setEmail("");
      setSelectedSeats([]);
    }

    setTimeout(() => {
      navigate("/bookings");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-700 text-center">
        {isEditing ? "Edit Your Booking" : `Book Tickets for "${movie?.title}"`}
      </h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={movie?.poster}
            alt={movie?.title}
            className="rounded-lg shadow-md w-full object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold text-gray-800">{movie?.title}</h3>
          <p className="mt-2 text-gray-600">{movie?.description || "Enjoy your movie!"}</p>
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
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
            <div>
              <span className="font-semibold">Number of Tickets:</span> {selectedSeats.length}
            </div>
            <div>
              <span className="font-semibold">Price per Ticket:</span> ₹{ticketPrice}
            </div>
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
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition"
            >
              {isEditing ? "Update Booking" : "Confirm Booking"}
            </button>

            <button
              type="button"
              onClick={() => {
                setName("");
                setEmail("");
                setSelectedSeats([]);
                setIsEditing(false);
                setEditIndex(null);
                localStorage.removeItem("editBooking");
                localStorage.removeItem("editIndex");
                setSuccessMessage("");
                setResetClicked(true); // <-- prevent re-loading editBooking after reset
              }}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-md transition"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("editBooking");
                localStorage.removeItem("editIndex");
                navigate("/");
              }}
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
