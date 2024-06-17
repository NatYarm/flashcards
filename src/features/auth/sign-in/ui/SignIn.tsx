import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledCheckbox, ControlledTextField } from '@/common/components/controlled'
import { Typography } from '@/common/components/typography'
import { LoginFormProps, loginScheme } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './sign-in.module.scss'

type FormType = z.infer<typeof loginScheme>

type Props = {
  onSubmit: (data: FormType) => void
}

export const SignIn = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginScheme),
  })

  const formSubmitHandler = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Sign In
      </Typography>
      <form className={s.form} onSubmit={formSubmitHandler}>
        <div className={s.controlled}>
          <ControlledTextField control={control} label={'Email'} name={'email'} />
          <ControlledTextField
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
          <ControlledCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
          <Typography
            as={Link}
            className={s.recoverPasswordLink}
            to={'/recovery-password'}
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
        <Typography variant={'body2'}>Don&apos;t have an account?</Typography>
        <Typography as={Link} className={s.signUpLink} to={'/sign-up'} variant={'link1'}>
          Sign Up
        </Typography>
      </div>
    </Card>
  )
}
