import { Avatar, Typography } from '@/common/components'

import s from './userDropdownTrigger.module.scss'

type Props = {
  name?: string
  src?: string
}

export const UserDropdownTrigger = ({ name, src }: Props) => {
  return (
    <div className={s.container}>
      <Typography className={s.name} variant={'h4'}>
        {name}
      </Typography>
      <Avatar name={name} src={src} />
    </div>
  )
}

UserDropdownTrigger.displayName = 'UserDropdownTrigger'
