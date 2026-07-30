import { z } from "zod";

export const userSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Full name must be at least 3 characters"),

    email: z
      .string()
      .trim()
      .email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional()
      .or(z.literal("")),

    confirmPassword: z
      .string()
      .optional()
      .or(z.literal("")),

    role: z.enum(["ADMIN", "AGENT"]),
  })
  .refine(
    (data) => {
      if (!data.password && !data.confirmPassword) {
        return true;
      }

      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );