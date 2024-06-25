import { useForm } from 'react-hook-form'

import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledInput } from '@/common/components/controlled/controlledInput'
import { Typography } from '@/common/components/typography'
import { passwordSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './newPassword.module.scss'

import { FormData } from '../loginForm'

type Props = {
  onSubmit: (data: FormData) => void
}

export const NewPassword = (props: Props) => {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(passwordSchema),
  })

  const handleFormSubmitted = handleSubmit(props.onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleFormSubmitted}>
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
