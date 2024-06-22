import { Avatar } from '@/common/components/avatar'
import { DropdownMenu, DropdownMenuLabel } from '@/common/components/dropdown'
import { Typography } from '@/common/components/typography'

export type UserDropdownProps = {
  avatar?: null | string
  email?: string | undefined
  name?: string
  onSelectLogOut?: () => void
  onSelectProfile?: () => void
}

export const UserDropdown = ({ avatar, email, name }: UserDropdownProps) => {
  if (!avatar) {
    avatar = 'https://avatars.githubusercontent.com/u/1196875?v=4'
  }

  return (
    <DropdownMenu trigger={<Avatar src={avatar} />}>
      <DropdownMenuLabel>
        <Avatar src={avatar} />
        <div>
          <Typography variant={'subtitle2'}>{name}</Typography>
          <Typography>{email}</Typography>
        </div>
      </DropdownMenuLabel>
    </DropdownMenu>
  )
}
