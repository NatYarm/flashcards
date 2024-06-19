import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledTextField } from '@/common/components/controlled'
import { Typography } from '@/common/components/typography'
import { LoginFormProps, loginScheme } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './recoverPassword.module.scss'

type FormType = z.infer<typeof loginScheme>

type Props = {
  onSubmit: (data: FormType) => void
}

export const RecoverPassword = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginScheme),
  })

  const formSubmitHandler = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={formSubmitHandler}>
        <div className={s.controlled}>
          <ControlledTextField control={control} label={'Email'} name={'email'} />
          <Typography className={s.instructions} variant={'body2'}>
            Enter your email address and we will send you further instructions
          </Typography>
        </div>
        <Button fullWidth type={'submit'}>
          Send Instructions
        </Button>
      </form>
      <div className={s.footer}>
        <Typography variant={'body2'}>Did you remember your password?</Typography>
        <Typography as={Link} className={s.signUpLink} to={'/sign-in'} variant={'link1'}>
          Try logging in
        </Typography>
      </div>
    </Card>
  )
}
