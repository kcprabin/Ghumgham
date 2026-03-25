import { Router } from "express";
import {registerHotel , createroom ,deleteRoom , featuredHotels, HotelData} from "../controller/register.controller.js";
// @ts-ignore --- IGNORE ---



const router = Router();

router.post("/register", registerHotel);
router.post("/room/:hotelId", createroom);
router.delete("/room/:hotelId/:roomId", deleteRoom); 
router.get("/featured", featuredHotels); 
router.get("/:hotelId", HotelData);



export default router;