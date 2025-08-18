import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import movies from "../data/Movies.js";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return (
      <p className="text-center mt-10 text-red-500 text-lg">
        Movie not found!
      </p>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg transition duration-200"
      >
        ⬅ Back
      </button>

      {/* Movie Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-[500px] object-cover"
        />

        {/* Movie Info */}
        <div className="p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
            <p className="text-gray-600 mb-4">{movie.description}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Rating:</strong> ⭐ {movie.rating}</p>

            {/* Genres */}
            <p className="mt-2">
              <strong>Genres:</strong>{" "}
              {movie.genre?.length
                ? movie.genre.join(", ")
                : "No genres available"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <a
              href={movie.trailer}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105"
            >
              🎥 Watch Trailer
            </a>
            <button
              onClick={() => navigate(`/booking/${movie.id}`)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:scale-105"
            >
              🎟 Book Now
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
