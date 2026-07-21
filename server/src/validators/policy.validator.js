import { z } from "zod";

export const createPolicySchema = z.object({
  policyNumber: z.string().min(1, "Policy number is required"),

  policyName: z
    .string()
    .min(3, "Policy name must be at least 3 characters"),

  policyType: z.string().min(1, "Policy type is required"),

  description: z.string().optional(),

  premiumAmount: z.coerce
    .number()
    .positive("Premium amount must be greater than 0"),

  coverageAmount: z.coerce
    .number()
    .positive("Coverage amount must be greater than 0"),

  paymentFrequency: z.enum([
    "MONTHLY",
    "QUARTERLY",
    "HALF_YEARLY",
    "YEARLY",
  ]),

  startDate: z.coerce.date(),

  endDate: z.coerce.date(),

  status: z
    .enum([
      "ACTIVE",
      "EXPIRED",
      "CANCELLED",
    ])
    .optional(),

  customerId: z.coerce
    .number()
    .int()
    .positive("Customer ID is required"),
});

export const updatePolicySchema = createPolicySchema.partial();