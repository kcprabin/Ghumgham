import jwt from "jsonwebtoken";
import { apiError } from "../Utils/api.error.js";

const roleMiddleware = async (req: any, res: any, next: any) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return apiError(res, 401, "Unauthorized");
  }

try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      if (req.user.isVerified !== true) {
        return apiError(res, 403, "Forbidden: User is not verified");
      }
      next();
} catch (error) {
    return apiError(res, 401, "Invalid token or user not verified plese verify your account");
}
};

export { roleMiddleware };
