import { emailSchema, passwordSchema, rememberMeSchema } from '@/common/utils'
import { z } from 'zod'

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: rememberMeSchema,
})
