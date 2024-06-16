import { z } from 'zod'

export const loginScheme = z
  .object({
    confirmPassword: z.string(),
    email: z.string().email({ message: 'Invalid email' }),
    password: z
      .string()
      .min(3, { message: 'Minimum length is 3 characters' })
      .max(30, { message: 'Maximum length is 30 characters' }),
    radioGroup: z.boolean().optional().default(false),
    rememberMe: z.boolean().optional().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }

    return data
  })

export type LoginFormProps = z.infer<typeof loginScheme>
