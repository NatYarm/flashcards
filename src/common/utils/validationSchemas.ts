import { z } from 'zod'

export const emailSchema = z.string().email('Email must match format example@example.com')

export const passwordSchema = z
  .string()
  .min(4, { message: 'Password must be at least 4 characters' })
  .max(30, { message: 'Maximum number of characters is 30' })
  .refine(
    password => /[0-9]/.test(password) && /[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]/.test(password),
    {
      message: 'Password must contain at least one number and one special character.',
    }
  )

export const confirmPasswordSchema = z.string()

export const rememberMeSchema = z.boolean().optional().default(false)

export const radioGroupSchema = z.boolean().optional().default(false)

export const fileSchema = z.instanceof(File).refine(file => file.size < 1000000, {
  message: 'Your image must be less than 1 MB.',
})

export const text = z
  .string()
  .min(3, { message: 'The field must contain more than 3 character' })
  .max(30, { message: 'The field must not contain more than 30 characters' })
