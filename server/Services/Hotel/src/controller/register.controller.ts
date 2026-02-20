
import {asyncHandler,apiError,apiResponse} from "@packages"
const registerHotel = asyncHandler(async (req : any,res : any)=>{
    const {name,location,description} = req.body
    if(!name || !location || !description){
        return apiError(res, 400 , "All fields are required")
    }
    // Here you can add logic to save the hotel information to the database
    // For example:
    // const newHotel = await Hotel.create({name, location, description})
    
    // For now, we'll just return a success response
    return apiResponse(res, 201,true, "Hotel registered successfully", {name, location, description})
})


export default {    registerHotel
}