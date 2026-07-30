import { z } from "zod";

export const policySchema = z
  .object({
    policyName: z
      .string()
      .min(3, "Policy name must be at least 3 characters"),

    policyType: z.enum(
      ["LIFE", "HEALTH", "MOTOR", "HOME", "TRAVEL"],
      {
        errorMap: () => ({
          message: "Please select a policy type",
        }),
      }
    ),

    description: z.string().optional(),

    premiumAmount: z.coerce
      .number({
        invalid_type_error: "Premium amount is required",
      })
      .positive("Premium amount must be greater than 0"),

    coverageAmount: z.coerce
      .number({
        invalid_type_error: "Coverage amount is required",
      })
      .positive("Coverage amount must be greater than 0"),

    paymentFrequency: z.enum(
      ["MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"],
      {
        errorMap: () => ({
          message: "Please select a payment frequency",
        }),
      }
    ),

    startDate: z.string().min(1, "Start date is required"),

    endDate: z.string().min(1, "End date is required"),

    customerId: z.coerce
      .number({
        invalid_type_error: "Please select a customer",
      })
      .positive("Please select a customer"),

    status: z.enum(
      ["ACTIVE", "EXPIRED", "CANCELLED"],
      {
        errorMap: () => ({
          message: "Please select a status",
        }),
      }
    ),
  })
  .refine(
    (data) =>
      new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );