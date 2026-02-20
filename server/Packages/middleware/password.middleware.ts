import { UserModel } from "Model/User.model.js";

 async function passwordCheck(req: any, res: any, next: any) {
    const userId = req.user._id; 
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }
  
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isCorrect = user.comparePassword(password);
    if (!isCorrect) {
      return res.status(401).json({ success: false, message: "Incorrect password please find correct password to continue" });
    }

    next();
  } 

export { passwordCheck };