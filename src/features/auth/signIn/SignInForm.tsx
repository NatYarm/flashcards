import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button, Card, Page, Typography } from '@/common/components'
import { ControlledCheckbox, ControlledTextField } from '@/common/components/controlled'
import { path } from '@/common/enams'
import { emailScheme, passwordScheme, rememberMeScheme } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signInForm.module.scss'

const loginScheme = z.object({
  email: emailScheme,
  password: passwordScheme,
  rememberMe: rememberMeScheme,
})

export type SignIn = z.infer<typeof loginScheme>

type Props = {
  onSubmit: (data: SignIn) => void
}

export const SignInForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<SignIn>({
    resolver: zodResolver(loginScheme),
  })

  const formSubmitHandler = handleSubmit(onSubmit)

  return (
    <Page>
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
              to={path.recoveryPassword}
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
          <Typography as={Link} className={s.signUpLink} to={path.signUp} variant={'link1'}>
            Sign Up
          </Typography>
        </div>
      </Card>
    </Page>
  )
}
