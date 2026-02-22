import jwt from "jsonwebtoken";
import { apiError, asyncHandler, apiResponse , UserModel } from "@packages";

export const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return apiError(res, 401, "Unauthorized");
  }
  try {
    const secret: string = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    console.log("Decoded token:", decoded);
    next();
  } catch (err : any) {
    return apiError(res, 401, "Invalid token");
  }
};  

export const adminMiddleware = (req: any, res: any, next: any) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return apiError(res, 403, "Forbidden: Admins only");
  }
}

export const superAdminMiddleware = (req: any, res: any, next: any) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    return apiError(res, 403, "Forbidden: Super Admins only");
  }
} 


export default { authMiddleware, adminMiddleware, superAdminMiddleware, };