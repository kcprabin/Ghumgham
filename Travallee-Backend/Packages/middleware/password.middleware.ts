import { UserModel } from "../Model/User.model.js";
import { apiError } from "../Utils/api.error.js"; 
import { apiResponse } from "../Utils/api.response.js";

 async function passwordCheck(req: any, res: any, next: any) {
    const userId = req.user._id; 
    const { password } = req.body;
    
    if (!password) {
      return apiError(res, 400, "Password is required");
    }
  
    if (password.length < 6) {
      return apiError(res, 400, "Password must be at least 6 characters long");
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return apiError(res, 404, "User not found");
    }
    const isCorrect = user.comparePassword(password);
    if (!isCorrect) {
      return apiError(res, 401, "Incorrect password please find correct password to continue");
    }

    next();
  } 

export { passwordCheck };