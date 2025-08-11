import React from "react";
import { Link } from "react-router-dom";
import movies from "../data/Movies.js";

const MovieList = () => {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-blue-700">
        🎬 Now Showing
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Poster */}
            <div className="relative overflow-hidden group">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <span className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-md">
                ⭐ {movie.rating}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-bold">{movie.title}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {movie.description}
                </p>
                <div className="text-sm text-gray-500 mt-2">
                  <p><strong>Director:</strong> {movie.director}</p>
                  <p><strong>Year:</strong> {movie.year}</p>
                  <p><strong>Duration:</strong> {movie.duration}</p>
                </div>
              </div>

              {/* View Details Button */}
              <Link
                to={`/movies/${movie.id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
