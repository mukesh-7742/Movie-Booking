import express from "express";
import multer from "multer";
import {
  addMovie,
  getMovies,
  getMovieById, // 👈 import new controller
} from "../controllers/movieController.js";

const router = express.Router();
const upload = multer(); // use memory storage (no file saving locally)

// Add a new movie
router.post("/", upload.single("poster"), addMovie);

// Get all movies
router.get("/", getMovies);

// ✅ Get single movie by ID
router.get("/:id", getMovieById);

export default router;
