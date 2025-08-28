import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    bookingDate: {
        type: Date,
        default: Date.now,
    },
    seats: {
        type: [Number],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "At least one seat must be selected",
        },
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Price must be a positive number"],
    },
}, { timestamps: true });

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
