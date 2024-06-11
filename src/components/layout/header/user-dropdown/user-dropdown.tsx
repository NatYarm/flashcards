import { Avatar } from '@/components/ui/avatar/avatar'
import { DropdownMenu, DropdownMenuLabel } from '@/components/ui/dropdown'

import { Typography } from '../../../ui/typography'

export type UserDropdownProps = {
  avatar: null | string
  email: string
  onLogout: () => void
  userName: string
}

export const UserDropdown = ({ avatar, email, onLogout, userName }: UserDropdownProps) => {
  if (!avatar) {
    avatar = 'https://avatars.githubusercontent.com/u/1196875?v=4'
  }

  return (
    <DropdownMenu trigger={<Avatar src={avatar} />}>
      <DropdownMenuLabel>
        <Avatar src={avatar} />
        <div>
          <Typography variant={'subtitle2'}>{userName}</Typography>
          <Typography>{email}</Typography>
        </div>
      </DropdownMenuLabel>
    </DropdownMenu>
  )
}
