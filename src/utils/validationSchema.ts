import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат email' }),
  password: z
    .string()
    .min(3, { message: 'Пароль должен содержать минимум 3 символа' })
    .max(30, { message: 'Пароль должен содержать максимум 30 символов' }),
  radioGroup: z.boolean().optional().default(false),
  rememberMe: z.boolean().optional().default(false),
})

export type LoginFormProps = z.infer<typeof loginSchema>
