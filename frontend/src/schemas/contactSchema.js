import { z } from "zod";

export const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be atleast two characters"),
    email: z
        .email("Enter a valid email address"),
    message: z
        .string()
        .min(10, "Message must be atleast 10 characters")
});