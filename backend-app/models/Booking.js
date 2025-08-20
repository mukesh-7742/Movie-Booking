import mongoose from "mongoose";

const BokingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },

    bookingDate: {
        type: Date,
        default: Date.now,
    },
    seats: {
        type: [Number],
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },

}, {timestamps: true});

const Booking = mongoose.model('Booking', BokingSchema);

export default Booking;
