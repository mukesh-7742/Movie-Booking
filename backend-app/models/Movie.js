import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    genre: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number, // store only year
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },

    // For Cloudinary upload
    poster: {
      public_id: { type: String }, // Cloudinary ID
      url: { type: String },       // Cloudinary URL
    },

    // For direct link to an image (without upload)
    imageUrl: {
      type: String,
    },

    category: {
      type: String,
      enum: ["Hollywood", "Bollywood", "Anime", "Series"],
      default: "Hollywood",
    },

    cast: [
      {
        name: { type: String, required: true },
        role: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
