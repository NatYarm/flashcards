import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(3, { message: 'Minimum length is 3 characters' })
    .max(30, { message: 'Maximum length is 30 characters' }),
  radioGroup: z.boolean().optional().default(false),
  rememberMe: z.boolean().optional().default(false),
})

export type LoginFormProps = z.infer<typeof loginSchema>
