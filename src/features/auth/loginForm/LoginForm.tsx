import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { ControlledCheckbox } from '@/common/components/controlled'
import { ControlledInput } from '@/common/components/controlled/controlledInput'
import { emailSchema, passwordSchema, rememberMeSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './loginForm.module.scss'

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: rememberMeSchema,
})

type Props = {
  onSubmit: (data: FormData) => void
}

export type FormData = z.infer<typeof loginSchema>

export const LoginForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  })

  const handleFormSubmit = handleSubmit(onSubmit)

  return (
    <form className={s.loginForm} onSubmit={handleFormSubmit}>
      <ControlledInput control={control} label={'Email'} name={'email'} />
      <ControlledInput control={control} label={'Password'} name={'password'} type={'password'} />

      <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
