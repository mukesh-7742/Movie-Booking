import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError("Invalid movie ID");
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
        // Show backend error if available
        setError(err.response?.data?.message || "Movie not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // 🔄 Loading state
  if (loading)
    return (
      <h2 className="text-center text-gray-500 font-semibold text-xl mt-10">
        Loading movie details...
      </h2>
    );

  // ⚠️ Error state
  if (error || !movie)
    return (
      <h2 className="text-center text-red-600 font-bold text-2xl mt-10">
        ⚠️ {error || "Movie not found!"}
      </h2>
    );

  // 🎬 Success: Show movie info & form
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <img
            src={movie.poster?.url || "https://placehold.co/400x600?text=No+Image"}
            alt={movie.title || "Movie Poster"}
            className="mx-auto rounded-lg shadow-lg w-64 h-96 object-cover"
          />
          <h1 className="text-3xl font-bold mt-4 text-indigo-700">{movie.title}</h1>
          <p className="text-gray-600 mt-2">{movie.description}</p>
        </div>

        <BookingForm movie={movie} />
      </div>
    </div>
  );
}
