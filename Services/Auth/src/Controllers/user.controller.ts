import { UserModel } from "../Model/User.model.ts";
import { asyncHandler } from "../Utils/asynchandler.ts";
import { apiError } from "../Utils/api.error.ts";
import { apiResponse } from "../Utils/api.response.ts";
import { UserType } from "../Schema/user.schema.ts";
import zod from "zod";

const registerUser = asyncHandler(async (req: any, res: any) => {
  const { Username, password } = req.body;
  let validate: any;
  try {
     validate = UserType.parse(req.body);
  } catch (error) {
    if (error instanceof zod.ZodError) {
      return apiError(res, 400, "Validation failed", error);
    }
    return apiError(res, 500, "Internal Server Error");
  }
  console.log(validate);

  if (!Username || !password) {
    return apiError(res, 400, "Username and password are required");
  }

  const existingUser = await UserModel.findOne({ Username });

  if (existingUser) {
    return apiError(res, 400, "Username already exists");
  }

  const newUser = await UserModel.create(validate);

  return apiResponse(res, 201, true, "User registered successfully", newUser);
});


export { registerUser };
