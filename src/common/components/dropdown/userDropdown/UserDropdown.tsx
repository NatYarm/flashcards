import { LogOutOutline, PersonOutline } from '@/assets/icons/components'
import { Avatar } from '@/common/components/avatar'
import { DropdownMenu, DropdownSeparator } from '@/common/components/dropdown'
import { DropdownMenuItem } from '@/common/components/dropdown/dropdownItem/DropdownMenuItem'
import { DefaultDescription } from '@/common/components/dropdown/dropdownItem/defaultDescription/DefaultDescription'
import { UserDropdownTrigger } from '@/common/components/dropdown/userDropdown/userDropdownTrigger/UserDropdownTrigger'
import { Typography } from '@/common/components/typography'

import s from './userDropdown.module.scss'

export type UserDropdownProps = {
  avatar?: null | string
  email?: string | undefined
  name?: string
  onSelectLogOut?: () => void
  onSelectProfile?: () => void
}

export const UserDropdown = ({
  avatar,
  email,
  name,
  onSelectLogOut,
  onSelectProfile,
}: UserDropdownProps) => {
  if (!avatar) {
    avatar = 'https://avatars.githubusercontent.com/u/1196875?v=4'
  }

  return (
    <DropdownMenu trigger={<UserDropdownTrigger name={name} src={avatar} />}>
      <DropdownMenuItem>
        <Avatar name={name} src={avatar} />
        <div className={s.dataContainer}>
          <Typography as={'span'} className={s.name} variant={'subtitle2'}>
            {name}
          </Typography>
          <Typography as={'span'} className={s.email} variant={'caption'}>
            {email}
          </Typography>
        </div>
      </DropdownMenuItem>

      <DropdownSeparator />
      <DropdownMenuItem onSelect={onSelectProfile}>
        <PersonOutline />
        <DefaultDescription text={'My Profile'} />
      </DropdownMenuItem>

      <DropdownSeparator />
      <DropdownMenuItem onSelect={onSelectLogOut}>
        <LogOutOutline />
        <DefaultDescription text={'Sign Out'} />
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

UserDropdown.displayName = 'UserDropdown'
