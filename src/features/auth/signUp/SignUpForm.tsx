import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledTextField } from '@/common/components/controlled'
import { Typography } from '@/common/components/typography'
import { path } from '@/common/enums'
import { confirmPasswordSchema, emailSchema, passwordSchema, passwordsMatch } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './signUpForm.module.scss'

const loginScheme = z
  .object({
    confirmPassword: confirmPasswordSchema,
    email: emailSchema,
    password: passwordSchema,
  })
  .superRefine((data, ctx) => {
    const issues = passwordsMatch(data)

    issues.forEach(issue => ctx.addIssue(issue))
  })

export type SignUp = z.infer<typeof loginScheme>

type Props = {
  onSubmit: (data: SignUp) => void
}

export const SignUpForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<SignUp>({
    resolver: zodResolver(loginScheme),
  })

  const formSubmitHandler = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Sign Up
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
          <ControlledTextField
            control={control}
            label={'Confirm Password'}
            name={'confirmPassword'}
            type={'password'}
          />
        </div>
        <Button fullWidth type={'submit'}>
          Sign Up
        </Button>
      </form>
      <div className={s.footer}>
        <Typography variant={'body2'}>Already have an account?</Typography>
        <Typography as={Link} className={s.signInLink} to={path.signIn} variant={'link1'}>
          Sign In
        </Typography>
      </div>
    </Card>
  )
}
