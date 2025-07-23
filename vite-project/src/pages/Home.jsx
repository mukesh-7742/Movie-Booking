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
  // New state for search
  const [search, setSearch] = useState("");

  // Filter movies based on search input
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-blue-400 text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Movie Booking</h1>
        <p className="text-lg md:text-xl mb-6">
          Book your favorite movies anytime, anywhere!
        </p>
        <Link to="/movies">
          <button className="bg-white text-indigo-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-200 transition">
            Book Now
          </button>
        </Link>
      </section>

      {/* Movies Grid */}
      <section className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Now Showing</h2>

        {/* Search Bar Feature */}
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <Link to={`/movies/${movie.id}`}>
                  <button className="mt-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                    Book Ticket
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No movies found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;