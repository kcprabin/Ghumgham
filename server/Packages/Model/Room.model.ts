import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({

    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"hotelModel",
        required:true
    },

    roomNumber:{
        type:String,
        required:true,
        unique:true
    },

    pricePerNights:{
        type:Number,
        required:true
    },

    capacity:{
        type:Number,
        required:true
    },

    roomType:{
        type:String,
        required:true
    }
 
},{timestamps:true})

export const roomModel=mongoose.model("rooms",roomSchema)