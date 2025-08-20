import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseYear: {
        type: Date,
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
    duration:{
        type: Number,
        required: true,
    },

},{timestamps: true})


const Movie = mongoose.model('Movie',movieSchema);


export default Movie;