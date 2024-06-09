import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledCheckbox } from '@/components/ui/controlled'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Typography } from '@/components/ui/typography'
import { LoginFormProps, loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './sign-in.module.scss'

export const SignIn = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={onSubmit}>
        <div className={s.controlled}>
          <ControlledInput control={control} label={'Email'} name={'email'} />
          <ControlledInput
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
          <Typography
            as={Link}
            className={s.recoverPasswordLink}
            to={'/recover-password'}
            variant={'body2'}
          >
            Forgot Password?
          </Typography>
        </div>
        <Button fullWidth type={'submit'}>
          Sign In
        </Button>
      </form>
      <div className={s.footer}>
        <Typography variant={'body2'}>Don't have an account?</Typography>
        <Typography variant={'link1'}>Sign Up</Typography>
      </div>
    </Card>
  )
}
