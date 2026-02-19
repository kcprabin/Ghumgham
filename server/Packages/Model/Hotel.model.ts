import mongoose, { SchemaType } from "mongoose";

const HotelSchema=new mongoose.Schema({

    hotel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },

    hotelDescription:{
        type:String,
    },

    hotelLocation:{
        type:String,
        required:true
    },
    hotelName:{
        type:String,
        required:true
    }



},{timestamps:true})




export const hotel=mongoose.model('hotels',HotelSchema);