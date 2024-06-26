import { z } from 'zod'

export const emailSchema = z
  .string()
  .min(1, { message: 'This field has to be filled.' })
  .email('This is not a valid email.')

export const passwordSchema = z
  .string()
  .min(4, { message: 'Password must be at least 4 characters' })
  .max(30, { message: 'The field must not contain more than 30 characters' })

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

export const passwordsMatch = (data: { confirmPassword: string; password: string }) => {
  if (data.password !== data.confirmPassword) {
    return [
      {
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      },
    ]
  }

  return []
}

// как использовать
/*const loginScheme = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmpasswordSchema,
    rememberMe: rememberMeScheme,
    radioGroup: radioGroupScheme,
  })
  .superRefine((data, ctx) => {
    const issues = passwordsMatch(data);
    issues.forEach(issue => ctx.addIssue(issue));
  });

type Props = {
  onSubmit: (data: FormData) => void
}

export type FormData = z.infer<typeof loginScheme>;

const MyFormComponent = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginScheme),
  });

const handleFormSubmit = handleSubmit(onSubmit)
*/
