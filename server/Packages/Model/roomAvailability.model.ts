import mongoose from "mongoose";

const roomAvailability=new mongoose.Schema({

    room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"roomModel",
        required:true
    },

    date:{
        type:Date,
        required:true
    },

    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"bookingModel",
        required:true
    }

},{timestamps:true})

export const roomAvailabilityModel=mongoose.model("roomAvailability",roomAvailability); 