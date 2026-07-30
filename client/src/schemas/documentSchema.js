import { z } from "zod";

export const documentSchema = z.object({
  documentName: z
    .string()
    .min(2, "Document name is required."),

  documentType: z
    .string()
    .min(2, "Document type is required."),

  customerId: z
    .union([z.string(), z.number()])
    .refine((value) => String(value).trim() !== "", {
      message: "Please select a customer.",
    }),

  file: z
    .any()
    .optional(),
});