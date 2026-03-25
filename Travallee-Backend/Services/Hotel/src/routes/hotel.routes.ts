import { Router } from "express";
import {registerHotel , createroom ,deleteRoom , featuredHotels, HotelData} from "../controller/register.controller.js";
// @ts-ignore --- IGNORE ---
import {roleMiddleware , passwordCheck} from "@packages"


const router = Router();

router.post("/register", registerHotel);
router.post("/room/:hotelId",roleMiddleware, createroom);
router.delete("/room/:hotelId/:roomId",roleMiddleware, passwordCheck, deleteRoom); 
router.get("/featured", featuredHotels); 
router.get("/:hotelId", HotelData);

    

export default router;