import zod from "zod";

export const UserType = zod.object({
    id: zod.string().optional(),
    email: zod.string().email().optional(),
    Username: zod.string(),
    password: zod.string(),
    createdAt: zod.date().optional(),
    updatedAt: zod.date().optional(),
})  

export type UserType = zod.infer<typeof UserType>;
