import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledTextField } from '@/common/components/controlled'
import { Typography } from '@/common/components/typography'
import { path } from '@/common/enums'
import { emailSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './recoverPassword.module.scss'

const loginSchema = z.object({
  email: emailSchema,
})

type FormType = z.infer<typeof loginSchema>

type Props = {
  isLoading: boolean
  onSubmit: (data: FormType) => void
}

export const RecoverPassword = ({ isLoading, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(loginSchema),
  })

  const navigate = useNavigate()

  const formSubmitHandler = handleSubmit(async data => {
    await onSubmit(data)
    navigate(path.email)
  })

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
        <Button disabled={isLoading} fullWidth type={'submit'}>
          {isLoading ? 'Sending...' : 'Send Instructions'}
        </Button>
      </form>
      <div className={s.footer}>
        <Typography variant={'body2'}>Did you remember your password?</Typography>
        <Typography as={Link} className={s.signUpLink} to={path.signIn} variant={'link1'}>
          Try logging in
        </Typography>
      </div>
    </Card>
  )
}
