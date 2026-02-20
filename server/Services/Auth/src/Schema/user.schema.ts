import e from "express";
import zod from "zod";
// for database 

export const UserType = zod.object({
    id: zod.string().optional(),
    Name: zod.string().min(2, "Name must be at least 2 characters long"),
    email: zod.string().email().optional(),
    Username: zod.string().min(3, "Username must be at least 3 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    createdAt: zod.date(),
    updatedAt: zod.date(),
    role: zod.string().optional(),
    googleId: zod.string().optional(),
    isVerified: zod.boolean().optional(),
})  


// for register validation
export const registerSchema = zod.object({
    Username: zod.string().min(3, "Username must be at least 3 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})  

// for login validation
export const loginSchema = zod.object({
    Username: zod.string().min(3, "Username must be at least 3 characters long").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})

export type UserType = zod.infer<typeof UserType>;
