import React from "react";
import { useParams } from "react-router-dom";
import movies from "../data/Movies.js"; // lowercase to match variable

export default function Booking() {
  const { id } = useParams();
  
  // Find movie by id (convert URL param to number)
  const movie = movies.find((m) => m.id === parseInt(id, 10));

  if (!movie) {
    return <h2 style={{ color: "red", textAlign: "center" }}>Movie not found!</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      {/* Add booking form or button here */}
    </div>
  );
}
