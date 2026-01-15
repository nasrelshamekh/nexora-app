import { z } from "zod"

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  password: z.string().min(6, "New password must be at least 6 characters"),
  rePassword: z.string()
}).refine(data => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"]
})

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>
