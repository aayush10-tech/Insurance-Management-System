import { z } from "zod";

export const claimSchema = z.object({
  claimNumber: z
    .string()
    .min(1, "Claim Number is required"),

  claimAmount: z
    .number({
      required_error: "Claim Amount is required",
      invalid_type_error: "Claim Amount must be a number",
    })
    .positive("Claim Amount must be greater than 0"),

  claimReason: z
    .string()
    .min(3, "Claim Reason must be at least 3 characters"),

  incidentDate: z
    .string()
    .min(1, "Incident Date is required"),

  description: z
    .string()
    .optional(),

  status: z.enum([
    "PENDING",
    "APPROVED",
    "REJECTED",
  ]),

  remarks: z
    .string()
    .optional(),

  policyId: z
    .number({
      required_error: "Please select a policy",
      invalid_type_error: "Please select a policy",
    })
    .positive(),
});