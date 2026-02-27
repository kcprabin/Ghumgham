import { asyncHandler } from "../../../Packages/Utils/asynchandler.js"
import mongoose from "mongoose";
import { roomModel } from "../../../Packages/Model/Room.model.js"
import { bookingModel } from "../../../Packages/Model/Booking.model.js"
import { apiError } from "../../../Packages/Utils/api.error.js"
import { apiResponse } from "../../../Packages/Utils/api.response.js"
import { hotelModel } from "../../../Packages/Model/Hotel.model.js"
import * as crypto from "crypto";
import axios from "axios"



const createBooking = asyncHandler(async (req: any, res: any) => {

    const session = await mongoose.startSession();
    session.startTransaction();


    try {
        const { roomId, guests, checkIn, checkOut, paymentMethod } = req.body;

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
            return apiError({}, 400, "room capacity exceeded");
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


        const createBooking = new bookingModel({
            user: req.user._id,
            hotel: room.hotel,
            room: roomId,
            guests,
            checkIn: start,
            checkOut: end,
            status: "PENDING",
            bookingPayment: "UNPAID",
            totalPrice,
            paymentMethod
        }, { session });

        await createBooking.save({ session });

        await session.commitTransaction();
        session.endSession();



        const hotel = await hotelModel.findById(room.hotel);

        if (paymentMethod == "ESEWA") {

            if (!hotel?.esewa_Merchantid) {
                return apiError({}, 500, "Can't get hotel esewa Merchant Id")
            }

            if (!process.env.ESEWA_HASH_SECRET) {
                return apiError({}, 500, "ESEWA_HASH_SECRET is not configured")
            }

            const transaction_uuid = createBooking._id.toString();
            const product_code = hotel.esewa_Merchantid;
            const total_amount = totalPrice.toString();

            const signed_field_names = "total_amount,transaction_uuid,product_code";

             const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
                const signature = crypto.createHmac('sha256', process.env.ESEWA_HASH_SECRET).update(message).digest('base64');


                    const esewaPayload = {
                        amount: total_amount,
                        tax_amount: "0",
                        total_amount,
                        transaction_uuid,
                        product_code,
                        product_service_charge: "0",
                        product_delivery_charge: "0",
                        success_url: `${process.env.BASE_URL}/api/esewa/success`,
                        failure_url: `${process.env.BASE_URL}/api/esewa/failure`,
                        signed_field_names,
                        signature
                    };


                     return apiResponse({
            bookingId:createBooking._id,
            esewaFormData:esewaPayload,
            esewaUrl:"https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        }, 200, true, "Booking created");

        }



    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();

        return apiError({}, 400, error.message)
    }


})


const esewaSuccess=asyncHandler(async(req:any,res:any)=>{

    const {data}=req.query;
     const decoded = JSON.parse(
        Buffer.from(data, "base64").toString("utf8")
    );

    const bookingId=decoded.transaction_uuid;

    const verifyResponse= await axios.post("https://rc-epay.esewa.com.np/api/epay/transaction/status/",{
            product_code: decoded.product_code,
            total_amount: decoded.total_amount,
            transaction_uuid: bookingId
    })

    if(verifyResponse.data.status=="COMPLETE"){
        await bookingModel.findByIdAndUpdate(bookingId,{
            status:"CONFIRMED",
            bookingPayment:"PAID"
        });

        res.redirect(`${process.env.FRONTEND_URL}/payment-sucess`);
    }

    await bookingModel.findByIdAndUpdate(bookingId,{
        status:"CANCELLED"
    })

    res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
})


export { createBooking ,esewaSuccess}