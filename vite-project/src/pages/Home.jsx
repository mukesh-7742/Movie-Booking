import React, { useState } from "react";
import { Link } from "react-router-dom";

const movies = [
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
  },
  {
    id: 2,
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg",
  },
  {
    id: 3,
    title: "Barbie",
    poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
  },
  {
    id: 4,
    title: "Guardians of the Galaxy Vol. 3",
    poster: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg",
  },
];

function Home() {
  const [search, setSearch] = useState("");

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-400 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
          Welcome to Movie Booking
        </h1>
        <p className="text-lg md:text-xl mb-6 animate-fade-in-up">
          Book your favorite movies anytime, anywhere!
        </p>
      </section>

      {/* Movies Grid */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Now Showing
        </h2>

        {/* Search Bar */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out p-4 flex flex-col items-center group animate-fade-in-up"
              >
                <div className="overflow-hidden rounded-lg w-full h-64">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded group-hover:scale-110 transition-transform duration-300 ease-in-out"
                  />
                </div>
                <h3 className="text-lg font-bold mt-4 mb-2 text-center">
                  {movie.title}
                </h3>
                <Link to={`/movies/${movie.id}`} className="mt-auto">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300 ease-in-out">
                    Book Ticket
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-xl">🎬 Oops! No matching movies.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
