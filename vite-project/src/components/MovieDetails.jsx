import React from "react";
import { useParams, Link } from "react-router-dom";

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

const MovieDetails = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-2xl font-semibold">Movie Not Found</h2>
        <Link to="/movies" className="text-blue-500 underline mt-4 block">
          ⬅ Back to Movie List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-72 h-auto rounded-md shadow-md"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-700 mb-4">{movie.description}</p>

          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>🎬 Director:</strong> {movie.director}</p>
            <p><strong>📅 Year:</strong> {movie.year}</p>
            <p><strong>⏱ Duration:</strong> {movie.duration}</p>
            <p><strong>🏷 Genres:</strong> {movie.genres.join(", ")}</p>
          </div>

          <div className="mt-4">
            <span className="font-semibold">⭐ Rating: </span>
            <span className="text-yellow-500">
              {"★".repeat(Math.floor(movie.rating)) + (movie.rating % 1 ? "½" : "")}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href={movie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              🎞 Watch Trailer
            </a>
            <Link
              to={`/booking/${movie.id}`}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              🎟 Book Now
            </Link>
            <Link
              to="/movies"
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              ⬅ Back to Movies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
