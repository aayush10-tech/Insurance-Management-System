import { z } from "zod";

export const customerSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters"),

  email: z
    .email("Invalid email address"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Phone number must be 10 digits"),

  gender: z.enum(["Male", "Female", "Other"]),

  dateOfBirth: z.string().min(1, "Date of Birth is required"),

  address: z
    .string()
    .min(5, "Address is required"),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode"),

  occupation: z
    .string()
    .min(2, "Occupation is required"),

  annualIncome: z.coerce
    .number()
    .min(0, "Income must be positive"),

  aadhaarNumber: z
    .string()
    .regex(/^\d{12}$/, "Aadhaar must be 12 digits"),

  panNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number"),
});