import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledInput } from '@/common/components/controlled/controlledInput'
import { Typography } from '@/common/components/typography'
import { LoginFormProps, loginScheme } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './newPassword.module.scss'

export const NewPassword = () => {
  const { control, handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginScheme),
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
