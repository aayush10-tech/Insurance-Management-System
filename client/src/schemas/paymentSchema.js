import { z } from "zod";

export const paymentSchema = z.object({
  policyId: z
    .union([z.string(), z.number()])
    .refine((value) => String(value).trim() !== "", {
      message: "Policy is required",
    }),

  amount: z
    .coerce
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be greater than 0"),

  paymentDate: z
    .string()
    .min(1, "Payment date is required"),

  paymentMethod: z
    .string()
    .min(1, "Payment method is required"),

  transactionId: z
    .string()
    .optional()
    .or(z.literal("")),

  status: z
    .string()
    .min(1, "Status is required"),

  remarks: z
    .string()
    .optional()
    .or(z.literal("")),
});