import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Typography } from '@/components/ui/typography'
import { LoginFormProps, loginScheme } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './recovery-password.module.scss'

export const RecoveryPassword = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginScheme),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Forgot your password?
      </Typography>
      <form className={s.form} onSubmit={onSubmit}>
        <div className={s.controlled}>
          <ControlledInput control={control} label={'Email'} name={'email'} />
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
