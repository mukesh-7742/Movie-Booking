import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    description:
      "Peter Parker seeks help from Doctor Strange when his identity is revealed, causing chaos across the multiverse.",
    director: "Jon Watts",
    year: 2021,
    duration: "2h 28m",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
    description:
      "A chronicle of J. Robert Oppenheimer’s role in the development of the atomic bomb during World War II.",
    director: "Christopher Nolan",
    year: 2023,
    duration: "3h 0m",
  },
  {
    id: 3,
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    description:
      "Barbie and Ken embark on a journey of self-discovery after leaving the perfect world of Barbie Land.",
    director: "Greta Gerwig",
    year: 2023,
    duration: "1h 54m",
  },
  {
    id: 4,
    title: "Guardians of the Galaxy Vol. 3",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    description:
      "The Guardians must unite once more to protect the universe and one of their own.",
    director: "James Gunn",
    year: 2023,
    duration: "2h 30m",
  },
];

const BookingForm = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));
  const [form, setForm] = useState({ name: "", email: "", seats: 1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!movie) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold text-red-600">Movie not found</h2>
        <Link to="/movies" className="text-blue-500 underline mt-4 block">
          ← Back to Movies
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const newBooking = {
        id: Date.now(),
        movieId: movie.id,
        movieTitle: movie.title,
        name: form.name,
        email: form.email,
        seats: form.seats,
        timestamp: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem("bookings")) || [];
      existing.push(newBooking);
      localStorage.setItem("bookings", JSON.stringify(existing));

      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg my-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.poster} alt={movie.title} className="w-48 h-auto rounded-lg" />
        <div>
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-700">{movie.description}</p>
          <p className="mt-2"><strong>Director:</strong> {movie.director}</p>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Duration:</strong> {movie.duration}</p>
          <Link to="/movies" className="text-blue-500 underline mt-4 inline-block">
            ← Back to Movies
          </Link>
        </div>
      </div>

      {submitted ? (
        <div className="bg-green-100 p-4 rounded-lg mt-6 text-center">
          <h3 className="text-lg font-semibold text-green-700">Booking Successful!</h3>
          <p className="mt-2">
            Thank you, <strong>{form.name}</strong>! You've booked <strong>{form.seats}</strong> seat(s) for <strong>{movie.title}</strong>.
          </p>
          <Link to="/bookings" className="mt-4 block text-blue-600 underline">
            Go to My Bookings
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Number of Seats</label>
            <input
              type="number"
              name="seats"
              min="1"
              max="10"
              value={form.seats}
              onChange={handleChange}
              required
              className="mt-1 w-full border px-3 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
