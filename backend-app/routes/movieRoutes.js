import express from "express";
import multer from "multer";
import { getMovies, addMovie } from "../controllers/movieController.js";

const router = express.Router();

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", getMovies);
router.post("/", upload.single("poster"), addMovie);

export default router;
