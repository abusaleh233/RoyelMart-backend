import { z } from "zod";


const registerValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(),
  }),
});


const loginValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});


export const authValidation = {
  registerValidationSchema,
  loginValidationSchema,
};