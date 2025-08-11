import React, { useState } from "react";
import  movies  from "../data/Movies.js";
import { Link } from "react-router-dom";
import { Search, Filter } from "lucide-react";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const genres = ["All", ...new Set(movies.flatMap((m) => m.genres))];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "All" || movie.genres.includes(selectedGenre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-800 to-purple-800 text-white p-8 md:p-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
          🎬 Now Showing
        </h1>
        <p className="text-center text-lg text-gray-200 mb-8">
          Book tickets for your favorite movies instantly
        </p>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center w-full md:w-1/3 bg-white text-gray-800 rounded-full shadow-lg px-4 transition-all duration-300 hover:shadow-2xl">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 outline-none rounded-full"
            />
          </div>

          <div className="flex items-center w-full md:w-1/4 bg-white text-gray-800 rounded-full shadow-lg px-4 transition-all duration-300 hover:shadow-2xl">
            <Filter className="text-gray-500" size={20} />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 outline-none bg-transparent rounded-full"
            >
              {genres.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <div className="p-6">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] hover:rotate-[1deg]"
              >
                {/* Movie Poster */}
                <div className="relative group">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100"></div>
                  <span className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-md">
                    ⭐ {movie.rating}
                  </span>
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    {movie.genres.map((g, i) => (
                      <span
                        key={i}
                        className="bg-white/80 text-gray-900 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Movie Details */}
                <div className="p-4">
                  <h2 className="text-lg font-bold">{movie.title}</h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {movie.description || "No description available."}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Link to={`/booking/${movie.id}`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                        Book Now
                      </button>
                    </Link>

                    <Link
                      to={`/movies/${movie.id}`}
                      className="flex-1 text-center border border-blue-600 text-blue-600 py-2 px-4 rounded-full hover:bg-blue-50 transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-20">
            <p className="text-gray-500 text-lg">🎥 No movies found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
