import { Link } from 'react-router-dom'

import { Email } from '@/assets/icons/components'
import { Page } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Typography } from '@/common/components/typography'
import { path } from '@/common/enums'

import s from './checkEmail.module.scss'

type Props = {
  email?: string
}

export const CheckEmail = ({ email }: Props) => {
  const message = `We've sent an e-mail with instructions to ${email}`

  return (
    <Page>
      <Card className={s.card}>
        <Typography className={s.title} variant={'h1'}>
          Check Email
        </Typography>
        <div className={s.iconContainer}>
          <Email />
        </div>
        <Typography className={s.instructions} variant={'body1'}>
          {message}
        </Typography>
        <Button as={Link} fullWidth to={path.signIn}>
          Back to SignIn
        </Button>
      </Card>
    </Page>
  )
}
