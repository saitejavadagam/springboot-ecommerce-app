import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .pipe(z.email("Invalid email address")),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
    // .regex(/[A-Z]/, "Must contain uppercase")
    // .regex(/[a-z]/, "Must contain lowercase")
    // .regex(/\d/, "Must contain digit")
    // .regex(
    //   /[@$!%*?&^#()[\]{}\-_=+|;:'",.<>/\\]/,
    //   "Must contain special character")
})