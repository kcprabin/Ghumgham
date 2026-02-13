import { UserModel } from "../Model/User.model.ts";
import { asyncHandler } from "../Utils/asynchandler.ts";
import { apiError } from "../Utils/api.error.ts";
import { apiResponse } from "../Utils/api.response.ts";
import { registerSchema } from "../Schema/user.schema.ts";
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

export { registerUser };
