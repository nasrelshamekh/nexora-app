import { z } from "zod"

export const checkoutSchema = z.object({
  shippingAddress: z.object({
    details: z
      .string()
      .min(5, "Address details must be at least 5 characters"),

    city: z
      .string()
      .min(2, "City is required"),

    phone: z
      .string()
      .regex(
        /^(?:\+20|20)?01[0125][0-9]{8}$/,
        "Enter a valid Egyptian mobile number (e.g. 01012345678)"
      ),
  }),
})

export type CheckoutFormValues = z.infer<typeof checkoutSchema>
