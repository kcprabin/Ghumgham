
import { apiError, asyncHandler, apiResponse , UserModel } from "@packages";
import { loginSchema, registerSchema } from "../Schema/user.schema.js";
import { z } from "zod";

const registerUser = asyncHandler(async (req: any, res: any) => {
  try {
    const validate = registerSchema.parse(req.body);
    const existingUser = await UserModel.findOne({
      Username: validate.Username,
    });

    if (existingUser) {
      return apiError(res, 400, "Username already exists");
    }

    const newUser = await UserModel.create(validate);
    const userResponse = {
      id: newUser._id,
      Username: newUser.Username,
      email: newUser.email,
      Name: newUser.Name,
      role: newUser.role,
    };
    return apiResponse(
      res,
      201,
      true,
      "User registered successfully",
      userResponse,
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return apiError(res, 400, "Validation Error", errors);
    }
    return apiError(res, 500, "Failed to register user", error);
  }
});

const loginUser = asyncHandler(async (req: any, res: any) => {
  try {
    const validate = loginSchema.parse(req.body);
    const user = await UserModel.findOne({
      Username: validate.Username,
    });
    if (!user) {
      return apiError(res, 400, "Invalid username");
    }
    const isPasswordValid = await user.comparePassword(validate.password);
    if (!isPasswordValid) {
      return apiError(res, 400, "Invalid password");
    }
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    const token = user.generateJWT();
    res.setHeader("Authorization", `Bearer ${token}`); 
    res.cookie("token", token, options);

    const userResponse = {
      id: user._id,
      Username: user.Username,
      role: user.role,
    };
    return apiResponse(
      res,
      200,
      true,
      "User logged in successfully",
      userResponse,
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return apiError(res, 400, "Validation Error", errors);
    }
    return apiError(res, 500, "Failed to login user", error);
  }
});

const logoutUser = asyncHandler(async (req: any, res: any) => { 
    res.clearCookie("token");
    res.setHeader("Authorization", "");
    return apiResponse(res, 200, true, "User logged out successfully");
});

const googleAuth = asyncHandler(async (req: any, res: any) => {
    const userProfile = req.user;
    const token = userProfile.generateJWT();
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    };
    res.setHeader("Authorization", `Bearer ${token}`);
    res.cookie("token", token, options);
    return apiResponse(res, 200, true, "Google authentication successful", userProfile);
});


export { registerUser, loginUser, logoutUser, googleAuth };
