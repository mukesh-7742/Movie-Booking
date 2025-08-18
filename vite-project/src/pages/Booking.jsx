import React from "react";
import { useParams } from "react-router-dom";
import movies from "../data/Movies.js";
import BookingForm from "../components/BookingForm";

export default function Booking() {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id, 10));

  if (!movie) {
    return (
      <h2 className="text-center text-red-600 font-bold text-2xl mt-10">

      </h2>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <BookingForm movie={movie} />
      </div>
    </div>

  );
}
