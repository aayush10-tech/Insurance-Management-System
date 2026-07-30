import { z } from "zod";

export const createPaymentSchema = z.object({
  policyId: z.coerce
    .number()
    .int()
    .positive("Policy ID is required"),

  amount: z.coerce
    .number()
    .positive("Amount must be greater than 0"),

  paymentDate: z.coerce.date({
    required_error: "Payment date is required",
    invalid_type_error: "Invalid payment date",
  }),

  paymentMethod: z.enum([
    "CASH",
    "UPI",
    "CARD",
    "NET_BANKING",
    "CHEQUE",
  ]),

  transactionId: z.string().optional(),

  status: z.enum([
    "PAID",
    "PENDING",
    "FAILED",
  ]),

  remarks: z.string().optional(),
});

export const updatePaymentSchema =
  createPaymentSchema.partial();