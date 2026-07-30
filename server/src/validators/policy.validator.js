import { z } from "zod";

const policySchema = z.object({
  policyName: z
    .string()
    .min(3, "Policy name must be at least 3 characters"),

  policyType: z
    .string()
    .min(2, "Policy type is required"),

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
    .positive("Customer is required"),
});

export const createPolicySchema = policySchema.refine(
  (data) => data.endDate > data.startDate,
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export const updatePolicySchema = policySchema.partial();