import jwt from "jsonwebtoken";
import { apiError } from "../Utils/api.error.js";

const roleMiddleware = async (req: any, res: any, next: any) => {
  const authHeader = req.headers?.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : undefined;
  const token = req.cookies?.token || bearerToken;

  if (!token) {
    return apiError(res, 401, "Unauthorized");
  }

try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = decoded;
      next();
} catch (error) {
    return apiError(res, 401, "Invalid or expired token");
}
};

export { roleMiddleware };
