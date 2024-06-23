import { Avatar } from '@/common/components/avatar'
import { DropdownMenu, DropdownMenuLabel } from '@/common/components/dropdown'
import { Typography } from '@/common/components/typography'

export type UserDropdownProps = {
  avatar: null | string
  email: string
  userName: string
}

export const UserDropdown = ({ avatar, email, userName }: UserDropdownProps) => {
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
