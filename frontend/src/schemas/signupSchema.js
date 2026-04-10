import { z } from 'zod';

export const signupSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must not exceed 50 characters")
        .regex(/^[A-Za-z ]+$/, "First name must contain only letters"),
    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must not exceed 50 characters")
        .regex(/^[A-Za-z]+$/, "Last name must contain only letters"),
    email: z
        .email("Invalid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
});