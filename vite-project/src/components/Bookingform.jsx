import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SeatSelector from "../components/SeatSelector";

const movies = [
  { id: 1, title: "Spider-Man: No Way Home", poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg" },
  { id: 2, title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg" },
  { id: 3, title: "Barbie", poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" },
  { id: 4, title: "Guardians of the Galaxy Vol. 3", poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg" },
];

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

  useEffect(() => {
    const editBooking = JSON.parse(localStorage.getItem("editBooking"));
    const index = localStorage.getItem("editIndex");

    if (editBooking && editBooking.movieId === parseInt(id)) {
      setName(editBooking.name);
      setEmail(editBooking.email);
      setSelectedSeats(editBooking.seats);
      setIsEditing(true);
      setEditIndex(index ? parseInt(index) : null);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
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

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];

    if (isEditing && editIndex !== null) {
      existing[editIndex] = newBooking;
      localStorage.removeItem("editBooking");
      localStorage.removeItem("editIndex");
    } else {
      existing.push(newBooking);
    }

    localStorage.setItem("bookings", JSON.stringify(existing));
    alert(isEditing ? "Booking Updated!" : "Booking Successful!");
    navigate("/bookings");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow rounded mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        {isEditing ? "Edit Booking" : `Book: ${movie?.title}`}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Number of People:</label>
          <input
            type="number"
            value={selectedSeats.length}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Price per Ticket:</label>
          <input
            type="text"
            value={`₹${ticketPrice}`}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium">Total Price:</label>
          <input
            type="text"
            value={`₹${ticketPrice * selectedSeats.length}`}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <SeatSelector
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />
        </div>

        <div className="flex justify-between flex-wrap gap-2 mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update Booking" : "Book Now"}
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
            }}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
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
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
