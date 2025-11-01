import asyncHandler from "express-async-handler";
import cloudinary from "../utils/cloudinary.js";
import Movie from "../models/Movie.js";


// 🎬 Add Movie with direct Cloudinary upload (no multer-storage-cloudinary)
export const addMovie = asyncHandler(async (req, res) => {
  let {
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

  // ✅ Cloudinary upload (if image uploaded)
  if (req.file) {
    try {
      const base64String = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64String, {
        folder: "movies",
      });
      poster = { public_id: result.public_id, url: result.secure_url };
    } catch (error) {
      console.error("❌ Cloudinary upload failed:", error);
      return res.status(500).json({ success: false, message: "Poster upload failed" });
    }
  }

  // ✅ Fix: handle cast safely
  let parsedCast = [];
  if (cast) {
    try {
      parsedCast = typeof cast === "string" ? JSON.parse(cast) : cast;
    } catch (error) {
      console.error("Cast parse error:", error);
      parsedCast = [];
    }
  }

  // ✅ Convert number-like fields
  releaseYear = Number(releaseYear);
  rating = Number(rating);
  duration = Number(duration);

  const movie = await Movie.create({
    title,
    genre,
    releaseYear,
    director,
    rating,
    description,
    duration,
    category,
    cast: parsedCast,
    poster,
  });

  res.status(201).json({
    success: true,
    message: "Movie added successfully",
    data: movie,
  });
});



// 🎥 Get all movies
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();
  res.status(200).json(movies);
});


// 🎞 Get single movie by ID
export const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.status(200).json(movie);
});
