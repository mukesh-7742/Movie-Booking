import express from "express";
import { getMovies, addMovie } from "../controllers/movieController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", protect, addMovie); // only logged-in users (or admin)

export default router;
