import { Router } from "express";
import {registerHotel , createroom ,deleteRoom , featuredHotels} from "../controller/register.controller.js";
import {roleMiddleware , passwordCheck} from "@packages"


const router = Router();

router.post("/register", registerHotel);
router.post("/room/:hotelId",roleMiddleware, createroom);
router.delete("/room/:hotelId/:roomId",roleMiddleware, passwordCheck, deleteRoom); 
router.get("/featured", featuredHotels); 



export default router;