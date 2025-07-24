// pages/Booking.jsx
import React from "react";
import { useParams } from "react-router-dom";
import BookingForm from "../components/Bookingform";

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    description: "Peter Parker faces his biggest challenge with help from multiverse heroes.",
    director: "Jon Watts",
    year: 2021,
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Superhero"],
    rating: 4.5,
    trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
    description: "A gripping biography of J. Robert Oppenheimer, father of the atomic bomb.",
    director: "Christopher Nolan",
    year: 2023,
    duration: "3h 0m",
    genres: ["Biography", "Drama", "History"],
    rating: 5,
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg",
  },
  {
    id: 3,
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    description: "Barbie and Ken journey from the perfect world of Barbieland to the real world.",
    director: "Greta Gerwig",
    year: 2023,
    duration: "1h 54m",
    genres: ["Comedy", "Fantasy", "Adventure"],
    rating: 4,
    trailer: "https://www.youtube.com/watch?v=pBk4NYhWNMM",
  },
  {
    id: 4,
    title: "Guardians of the Galaxy Vol. 3",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    description: "The Guardians face their past and fight to protect their family.",
    director: "James Gunn",
    year: 2023,
    duration: "2h 30m",
    genres: ["Sci-Fi", "Action", "Comedy"],
    rating: 4.8,
    trailer: "https://www.youtube.com/watch?v=u3V5KDHRQvk",
  },
];
const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) return <p>Movie not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Book Your Ticket</h2>
      <BookingForm movie={movie} />
    </div>
  );
};

export default Booking;
