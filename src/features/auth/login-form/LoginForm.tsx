import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'

import { ControlledCheckbox } from '@/common/components/controlled'
import { ControlledInput } from '@/common/components/controlled/controlledInput'

import { zodResolver } from '@hookform/resolvers/zod'

import s from './login-form.module.scss'
import { LoginFormProps, loginScheme } from '@/utils'

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginScheme),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form className={s.loginForm} onSubmit={onSubmit}>
      <ControlledInput control={control} label={'Email'} name={'email'} />
      <ControlledInput control={control} label={'Password'} name={'password'} type={'password'} />

      <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
