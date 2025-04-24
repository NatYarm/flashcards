import { emailSchema, rememberMeSchema } from '@/common/utils'
import { z } from 'zod'

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
  rememberMe: rememberMeSchema,
})
