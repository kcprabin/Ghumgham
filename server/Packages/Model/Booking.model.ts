import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    },

    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hotelModel"
    },

    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roomModel"
    },

    guests: {
        type: Number,
        required: true
    },

    checkIn: {
        type: Date,
        required: true
    },

    checkOut: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["CONFIRMED", "CANCELLED"],
        default: "CONFIRMED"

    }

}, { timestamps: true })

export const bookingModel = mongoose.model("bookings", bookingSchema)