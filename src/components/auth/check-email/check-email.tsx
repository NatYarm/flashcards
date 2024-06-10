import { Link } from 'react-router-dom'

import { Email } from '@/assets/icons/components'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

import s from './check-email.module.scss'

type Props = {
  email?: string
}

export const CheckEmail = ({ email }: Props) => {
  const message = `We've sent an e-mail with instructions to ${email}`

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Check Email
      </Typography>
      <div className={s.iconContainer}>
        <Email />
      </div>
      <Typography className={s.instructions} variant={'body2'}>
        {message}
      </Typography>
      <Button as={Link} fullWidth to={'/sing-in'}>
        Back to Sign In
      </Button>
    </Card>
  )
}
