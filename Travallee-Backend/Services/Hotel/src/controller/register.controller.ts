// @ts-ignore
import {asyncHandler,apiError,apiResponse,hotelModel,roomModel} from "@packages";
import type { HotelInput, RoomInput } from "../validator/hotel.validator.js";
import {
    createHotelSchema,
    createRoomSchema,
} from "../validator/hotel.validator.js";
import mongoose from "mongoose";


const registerHotel = asyncHandler(async (req: any, res: any) => {
    const userId = req.user?._id || req.user?.id;
    if (!userId) {
        return apiError(res, 401, "Unauthorized: User ID not found in request");
    }
    if (req.user?.isVerified !== true) {
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
        return apiResponse(
            res,
            201,
            true,
            "Hotel registered successfully",
            newHotel,
        );
    } catch (error) {
        return apiError(res, 500, "Internal server error");
    }
});

const createroom = asyncHandler(async (req: any, res: any) => {
    try {
        const parsedData = createRoomSchema.safeParse(req.body);
        if (!parsedData.success) {
            const validationErrors = parsedData.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            }));
            return apiError(res, 400, "Validation failed", validationErrors);
        }

        const { hotelId } = req.params;
        if (!hotelId) {
            return apiError(res, 400, "Hotel ID is required in URL parameters");
        }

        if (!mongoose.Types.ObjectId.isValid(hotelId)) {
            return apiError(res, 400, "Invalid hotel ID format");
        }

        const hotel = await hotelModel.findById(hotelId);
        if (!hotel) {
            return apiError(res, 404, "Hotel not found", { hotelId });
        }

        const roomData: RoomInput = parsedData.data;
        roomData.hotelId = hotelId;

        // Check if room with same number already exists in this hotel
        const existingRoom = await roomModel.findOne({
            hotelId: new mongoose.Types.ObjectId(hotelId),
            roomNumber: roomData.roomNumber,
        });

        if (existingRoom) {
            return apiError(
                res,
                409,
                "Room with this number already exists in this hotel"
            );
        }

        // Create the room
        const response = await roomModel.create(roomData);

        if (!response) {
            return apiError(res, 500, "Failed to save room to database");
        }

        return apiResponse(res, 201, true, "Room created successfully", response);
    } catch (error: any) {
        console.error("Error creating room:", error);

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const validationErrors = Object.entries(error.errors).map(
                ([field, err]: any) => ({
                    field,
                    message: err.message,
                })
            );
            return apiError(res, 400, "Room validation failed", validationErrors);
        }

        // Handle MongoDB duplicate key errors
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return apiError(
                res,
                409,
                `Room ${field} already exists. Please use a unique value.`
            );
        }

        // Handle other Mongoose errors
        if (error instanceof mongoose.Error.CastError) {
            return apiError(res, 400, "Invalid data format");
        }

        return apiError(
            res,
            500,
            "Internal server error: Unable to create room. Please try again later."
        );
    }
});

const deleteRoom = asyncHandler(async (req: any, res: any) => {
   const { hotelId, roomId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(hotelId) || !mongoose.Types.ObjectId.isValid(roomId)) {
        return apiError(res, 400, "Invalid hotel ID or room ID format");
    }

    try {
        const hotel = await hotelModel.findById(hotelId);
        if (!hotel) {
            return apiError(res, 404, "Hotel not found", { hotelId });
        }

        const room = await roomModel.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(roomId),
            hotelId: new mongoose.Types.ObjectId(hotelId),
        });

        if (!room) {
            return apiError(res, 404, "Room not found in this hotel", { roomId });
        }

        return apiResponse(res, 200, true, "Room deleted successfully");
    } catch (error: any) {
        console.error("Error deleting room:", error);
        return apiError(res, 500, "Internal server error: Unable to delete room. Please try again later.");
    }   
});

const featuredHotels = asyncHandler(async (req: any, res: any) => {
    try {
        const hotels = await hotelModel.find({ isFeatured: true });
        if (hotels.length === 0) {
            return apiError(res, 404, "No featured hotels found");
        }
        return apiResponse(
            res,
            200,
            true,
            "Featured hotels retrieved successfully",
            hotels,
        );
    } catch (error) {
        return apiError(res, 500, "Internal server error");
    }
});

const HotelData = asyncHandler(async (req: any, res: any) => {
    const { hotelId } = req.params;

    try {
        const hotel = await hotelModel.findById(hotelId);
        if (!hotel) {
            return apiError(res, 404, "Hotel not found");
        }
        return apiResponse(
            res,
            200,
            true,
            "Hotel data retrieved successfully",
            hotel,
        );
    } catch (error) {
        return apiError(res, 500, "Internal server error");
    }
});
export { registerHotel, createroom, deleteRoom, featuredHotels, HotelData };
