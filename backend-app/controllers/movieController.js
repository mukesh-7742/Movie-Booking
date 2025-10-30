import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Movie from "../models/Movie.js";

// 🎬 Add Movie with direct Cloudinary upload (no multer-storage-cloudinary)
export const addMovie = asyncHandler(async (req, res) => {
  const {
    title,
    genre,
    releaseYear,
    director,
    rating,
    description,
    duration,
    category,
    cast,
  } = req.body;

  let poster = {};

  if (req.file) {
    // Convert buffer to base64 string
    const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload directly to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "movies",
    });

    poster = { public_id: result.public_id, url: result.secure_url };
  }

  const movie = await Movie.create({
    title,
    genre,
    releaseYear,
    director,
    rating,
    description,
    duration,
    category,
    cast: cast ? JSON.parse(cast) : [],
    poster,
  });

  res.status(201).json(movie);
});

// 🎥 Get all movies
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
});
