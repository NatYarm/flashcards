import { useForm } from 'react-hook-form'

import { ControlledTextField } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { passwordSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './newPasswordForm.module.scss'

export type NewPassword = { password: z.infer<typeof passwordSchema> }

type Props = {
  onSubmit: (data: NewPassword) => void
}

export const NewPasswordForm = ({ onSubmit }: Props) => {
  const { control, handleSubmit } = useForm<NewPassword>({
    resolver: zodResolver(passwordSchema),
  })

  const handleFormSubmitted = handleSubmit(onSubmit)

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Create new password
      </Typography>
      <form className={s.form} onSubmit={handleFormSubmitted}>
        <div className={s.controlled}>
          <ControlledTextField
            control={control}
            label={'password'}
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
