
import {asyncHandler,apiError,apiResponse,hotelModel} from "@packages"
import type { HotelInput } from "../validator/hotel.validator.js"
import { createHotelSchema } from "../validator/hotel.validator.js"

const registerHotel = asyncHandler(async (req : any,res : any)=>{
    const userId = req.user.id;
    if (!userId) {
        return apiError(res, 401, "Unauthorized: User ID not found in request");
    }
    if (req.user.isVerified !== true) {
        return apiError(res, 401, "Unauthorized: User is not verified");
    }

    try {
        const parsedData = createHotelSchema.safeParse(req.body);
        if (!parsedData.success) {
            return apiError(res, 400, "Validation error", parsedData.error.issues);
        }
        const hotelData: HotelInput = parsedData.data;
        hotelData.userId = userId;
        const newHotel = new hotelModel(hotelData);
        await newHotel.save();
        return apiResponse(res, 201, true, "Hotel registered successfully", newHotel);    
    } catch (error) {
        return apiError(res,500,"Internal server error")
    }  
})

const createroom = asyncHandler(async (req : any,res : any)=>{
    const { hotelId } = req.params;
    const { roomNumber, roomType, pricePerNight ,suitetype } = req.body;

    try {
        const hotel = await hotelModel.findById(hotelId);
        if (!hotel) {
            return apiError(res, 404, "Hotel not found");
        }

        const newRoom = {
            roomNumber,
            roomType,
            pricePerNight,
            suitetype,
        };

        hotel.rooms.push(newRoom);
        await hotel.save();

        return apiResponse(res, 201, true, "Room created successfully", newRoom);
    } catch (error) {
        return apiError(res, 500, "Internal server error");
    }   
  
})

const deleteRoom = asyncHandler(async (req : any,res : any)=>{
    const { hotelId, roomId } = req.params;

    try {
        const hotel = await hotelModel.findById(hotelId);
        if (!hotel) {
            return apiError(res, 404, "Hotel not found");
        }

        const roomIndex = hotel.rooms.findIndex(room => room._id.toString() === roomId);
        if (roomIndex === -1) {
            return apiError(res, 404, "Room not found");
        }

        hotel.rooms.splice(roomIndex, 1);
        await hotel.save();

        return apiResponse(res, 200, true, "Room deleted successfully");
    } catch (error) {
        return apiError(res, 500, "Internal server error");
    }   
  
})



export  { registerHotel, createroom, deleteRoom ,}