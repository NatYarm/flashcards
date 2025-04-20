import { confirmPasswordSchema, emailSchema, passwordSchema } from '@/common/utils'
import { z } from 'zod'

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(arg => arg.password === arg.confirmPassword, {
    message: 'Passwords do not match. Try again.',
    path: ['passwordConfirmation'],
  })
