import { z } from "zod";

export const customerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.iso.datetime(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Pincode must be exactly 6 digits"),
  occupation: z.string().min(2, "Occupation is required"),
  annualIncome: z.number().min(0, "Annual income cannot be negative"),
  aadhaarNumber: z.string().regex(/^\d{12}$/, "Aadhaar must be exactly 12 digits"),
  panNumber: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN number"),
});