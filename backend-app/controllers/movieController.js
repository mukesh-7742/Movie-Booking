import Movie from "../models/Movie.js";

// Get all movies
const getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

// Add movie (admin)
const addMovie = async (req, res) => {
  const { title, description, showtime, availableSeats } = req.body;
  const movie = await Movie.create({ title, description, showtime, availableSeats });
  res.status(201).json(movie);
};

export { getMovies, addMovie };
