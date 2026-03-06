import { asyncHandler,apiError,apiResponse,roomModel,hotelModel,bookingModel } from "@packages"
import mongoose from "mongoose";
import * as crypto from "crypto";
import axios from "axios"


// use this for import 
import {sendEmail} from "@packages"
// definitation of packages is in tsconfig.json file

const createBooking = asyncHandler(async (req: any, res: any) => {

    const session = await mongoose.startSession();

    try {

        await session.withTransaction(async () => {

            const { roomId, guests, checkIn, checkOut, paymentMethod } = req.body;

            const start = new Date(checkIn);
            const end = new Date(checkOut);

            if (start >= end) {
                throw new Error("Invalid entry of dates");
            }

            const room = await roomModel
                .findById(roomId)
                .session(session);

            if (!room) {
                throw new Error("Room not found");
            }

            if (room.capacity < guests) {
                throw new Error("Room capacity exceeded");
            }

            const existingBooking = await bookingModel
                .findOne({
                    room: roomId,
                    checkIn: { $lt: end },
                    checkOut: { $gt: start },
                    status: { $in: ["PENDING", "CONFIRMED"] }
                })
                .session(session);

            if (existingBooking) {
                throw new Error("Room not available for entered dates");
            }

            const nights =
                (end.getTime() - start.getTime()) /
                (1000 * 60 * 60 * 24);

            const totalPrice = nights * room.pricePerNights;

            const booking = new bookingModel({
                user: req.user._id,
                hotel: room.hotel,
                room: roomId,
                guests,
                checkIn: start,
                checkOut: end,
                status: "PENDING",
                bookingPayment: "NOTPAID",
                totalPrice,
                paymentMethod
            });

            await booking.save({ session });

            const hotel = await hotelModel
                .findById(room.hotel)
                .session(session);

            if (paymentMethod === "ESEWA") {

                if (!hotel?.esewa_Merchantid) {
                    throw new Error("Hotel Esewa merchant id missing");
                }

                const transaction_uuid = booking._id.toString();
                const product_code = hotel.esewa_Merchantid;
                const total_amount = totalPrice.toString();

                const signed_field_names =
                    "total_amount,transaction_uuid,product_code";

                const message =
                    `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;

                const signature = crypto
                    .createHmac("sha256", process.env.ESEWA_HASH_SECRET!)
                    .update(message)
                    .digest("base64");

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

                return res.json({
                    success: true,
                    bookingId: booking._id,
                    esewaFormData: esewaPayload,
                    esewaUrl:
                        "https://rc-epay.esewa.com.np/api/epay/main/v2/form"
                });
            }

            return res.json({
                success: true,
                booking
            });

        });

    } catch (error: any) {

        return apiError({}, 400, error.message);

    } finally {

        session.endSession();

    }

});


const esewaSuccess=asyncHandler(async(req:any,res:any)=>{

   try {
     const {data}=req.query;
 
     if(!data){
        return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
     }
     
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
 
        return  res.redirect(`${process.env.FRONTEND_URL}/payment-sucess`);
     }
 
     await bookingModel.findByIdAndUpdate(bookingId,{
         status:"CANCELLED"
     })
 
     return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
   } catch (error) {

    return  res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);

    
   }
})


export { createBooking ,esewaSuccess}