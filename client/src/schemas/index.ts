import * as z from "zod";

export const createLinkSchema = z.object({
  link: z
    .string()
    .regex(
      /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/,
      "Invalid URL format. Please enter a valid link."
    ),
  title: z.string().optional(),
  tags: z
    .array(
      z.object({
        id: z.number(),
        text: z.string(),
      })
    )
    .optional(),
  qrCode: z.boolean().optional(),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
  code: z.optional(z.string()),
});

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("This is not a valid email."),
  password: z.string().min(6, {
    message: "Minimum 6 characters required.",
  }),
  name: z.string().min(1, {
    message: "Name is required.",
  }),
});
