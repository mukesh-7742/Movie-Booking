import React from "react";
import { Link } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    description: "Peter Parker faces his biggest challenge with help from multiverse heroes.",
    director: "Jon Watts",
    year: 2021,
    duration: "2h 28m",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
    description: "A gripping biography of J. Robert Oppenheimer, father of the atomic bomb.",
    director: "Christopher Nolan",
    year: 2023,
    duration: "3h 0m",
  },
  {
    id: 3,
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    description: "Barbie and Ken journey from the perfect world of Barbieland to the real world.",
    director: "Greta Gerwig",
    year: 2023,
    duration: "1h 54m",
  },
  {
    id: 4,
    title: "Guardians of the Galaxy Vol. 3",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
    description: "The Guardians face their past and fight to protect their family.",
    director: "James Gunn",
    year: 2023,
    duration: "2h 30m",
  },
];

const MovieList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">🎬 Now Showing</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-4 flex flex-col"
          >
            <div className="overflow-hidden rounded-md">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            <h3 className="text-xl font-semibold mt-4">{movie.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{movie.description}</p>
            <div className="text-sm text-gray-500 mt-2">
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Duration:</strong> {movie.duration}</p>
            </div>
            <div className="mt-4 flex gap-2">
              <Link
                to={`/movies/${movie.id}`}
                className="flex-1 text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                View Details
              </Link>
              <Link
                to={`/booking/${movie.id}`}
                className="flex-1 text-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
