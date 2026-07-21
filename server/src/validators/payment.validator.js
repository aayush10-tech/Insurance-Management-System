import { z } from "zod";

export const createPaymentSchema = z.object({
  amount: z.coerce
    .number()
    .positive("Amount must be greater than 0"),

  paymentMethod: z.enum([
    "CASH",
    "UPI",
    "CARD",
    "NET_BANKING",
    "CHEQUE",
  ]),

  transactionId: z.string().optional(),

  status: z
    .enum([
      "PAID",
      "PENDING",
      "FAILED",
    ])
    .optional(),

  remarks: z.string().optional(),

  policyId: z.coerce
    .number()
    .int()
    .positive("Policy ID is required"),
});

export const updatePaymentSchema = createPaymentSchema.partial();