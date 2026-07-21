import { z } from "zod";

export const createClaimSchema = z.object({
  claimNumber: z.string().min(1, "Claim number is required"),

  claimAmount: z.coerce.number().positive("Claim amount must be greater than 0"),

  claimReason: z.string().min(3, "Claim reason is required"),

  incidentDate: z.coerce.date(),

  description: z.string().optional(),

  status: z
    .enum(["PENDING", "APPROVED", "REJECTED"])
    .optional(),

  remarks: z.string().optional(),

  policyId: z.coerce.number().int().positive(),
});

export const updateClaimSchema = createClaimSchema.partial();