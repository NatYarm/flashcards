import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { ControlledCheckbox, ControlledTextField } from '@/components/ui/controlled'
import { LoginFormProps, loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './login-form.module.scss'

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form className={s.loginForm} onSubmit={onSubmit}>
      <ControlledTextField control={control} label={'Email'} name={'email'} />
      <ControlledTextField
        control={control}
        label={'Password'}
        name={'password'}
        type={'password'}
      />
      <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
