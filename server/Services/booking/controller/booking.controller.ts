import { asyncHandler } from "../../../Packages/Utils/asynchandler.js"
import mongoose from "mongoose";
import { roomModel } from "../../../Packages/Model/Room.model.js"
import { bookingModel } from "../../../Packages/Model/Booking.model.js"
import { apiError } from "../../../Packages/Utils/api.error.js"
import { apiResponse } from "../../../Packages/Utils/api.response.js"

const createBooking = asyncHandler(async (req: any, res: any) => {

    const session = await mongoose.startSession();
    session.startTransaction();


    try {
        const { roomId, guests, checkIn, checkOut } = req.body;

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (start > end) {
            return apiError({}, 400, "Invalid entry of dates")
        }

        const room = await roomModel.findById(roomId);

        if (!room) {
            return apiError({}, 400, "room not found");
        }

        if (room.capacity < guests) {
            return apiError({}, 400, "room capacity exteeded");
        }

        const bookingalreadyexist = await bookingModel.findOne({
            hotel: room.hotel,
            room: roomId,
            checkIn: { $lt: end },
            checkOut: { $gt: start },
            status: { $in: ["PENDING", "CONFIRMED"] }
        }).session(session);

        if (bookingalreadyexist) {
            return apiError({}, 400, "Room not avaialble for entered dates");
        }

        const totalnights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

        const totalPrice = totalnights * room.pricePerNights;


        const createBooking = await bookingModel.create([{
            user: req.user._id,
            hotel: room.hotel,
            room: roomId,
            guests,
            checkIn: start,
            checkOut: end,
            status: "PENDING",
            bookingPayment: "UNPAID",
            totalPrice
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return apiResponse(createBooking, 200, true, "Booking created");

    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();

        return apiError({}, 400, error.message)
    }


})


export { createBooking }