import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled/controlled-input'
import { Typography } from '@/components/ui/typography'
import { LoginFormProps, loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './new-password.module.scss'

export const NewPassword = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={onSubmit}>
        <div className={s.controlled}>
          <ControlledInput
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />
        </div>
        <Typography className={s.instructions} variant={'body2'}>
          Create new password and we will send you further instructions to email
        </Typography>
        <Button fullWidth type={'submit'}>
          Create New Password
        </Button>
      </form>
    </Card>
  )
}
