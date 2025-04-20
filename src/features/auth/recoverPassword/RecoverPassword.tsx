import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { Email } from '@/assets/icons/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledTextField } from '@/common/components/controlled'
import { Typography } from '@/common/components/typography'
import { path } from '@/common/enums'
import { emailSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './recoverPassword.module.scss'

const recoverySchema = z.object({
  email: emailSchema,
})

type FormType = z.infer<typeof recoverySchema>

type Props = {
  isLoading: boolean
  onSubmit: (email: string) => void
}

export const RecoverPassword = ({ isLoading, onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(recoverySchema),
  })
  const [email, setEmail] = useState('')
  const [recoveryOne, setRecoveryOne] = useState(true)

  const recoveryOneHandler = async (data: FormType) => {
    try {
      await onSubmit(data.email)
      setEmail(data.email)
      setRecoveryOne(false)
    } catch (error) {
      console.error('Error during password recovery:', error)
    }
  }

  return (
    <Card className={s.card}>
      {recoveryOne ? (
        <>
          <Typography className={s.title} variant={'h1'}>
            Forgot your password?
          </Typography>
          <form className={s.form} onSubmit={handleSubmit(recoveryOneHandler)}>
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
            <Typography variant={'body2'}>Remember your password?</Typography>
            <Typography as={Link} className={s.signUpLink} to={path.signIn} variant={'link1'}>
              Try logging in
            </Typography>
          </div>
        </>
      ) : (
        <div className={s.recoveryTwo}>
          <Typography className={s.title} variant={'h1'}>
            Check Email
          </Typography>
          <div className={s.iconContainer}>
            <Email />
          </div>
          <Typography className={s.instructions2} variant={'body1'}>
            {`We have sent an email with instructions to ${email}`}
          </Typography>
          <Button as={Link} fullWidth to={path.signIn}>
            Back to Sign In
          </Button>
        </div>
      )}
    </Card>
  )
}
