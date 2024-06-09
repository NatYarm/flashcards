import { useForm } from 'react-hook-form'

import { LoginForm } from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import { ControlledCheckbox } from '@/components/ui/controlled'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { LoginFormProps, loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from '../login-form/login-form.module.scss'

export const SignIn = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <LoginForm className={s.loginForm} onSubmit={onSubmit}>
      <ControlledInput control={control} label={'Email'} name={'email'} />
      <ControlledInput control={control} label={'Password'} name={'password'} type={'password'} />
      <ControlledCheckbox control={control} label={'Remember Me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </LoginForm>
    /* <LoginForm >
      <form className={s.loginForm} onSubmit={onSubmit}>
        <ControlledInput control={control} label={'Email'} name={'email'} />
        <ControlledInput control={control} label={'Password'} name={'password'} type={'password'} />
        <ControlledCheckbox control={control} label={'Remember Me'} name={'rememberMe'} />
        <Button type={'submit'}>Submit</Button>
      </form>
    </LoginForm>*/
  )
}
