import { LogOut, PersonOutline } from '@/assets/icons/components'

import s from './DropdownMenu.module.scss'

import { Typography } from '../typography'
import { DropDownItem } from './DropDownItem'
import { DropDownSeparator } from './DropDownSeparator'
import { DropdownMenuComponent } from './DropdownMenuComponent'

type Props = {
  email?: string
  name?: string
  photo?: string
  photoDesc?: string
  profilePageHref?: string
}
export const ExampleDropDown = ({ email, name, photo, photoDesc, profilePageHref }: Props) => {
  return (
    <DropdownMenuComponent trigger={<img alt={photoDesc} className={s.trigger_img} src={photo} />}>
      <DropDownItem>
        <div className={s.DropdownMenuItem}>
          <img alt={photoDesc} className={s.DropdownMenuItem_img} src={photo} />
          <div className={s.nameAndemail}>
            <Typography as={'div'} className={s.userName} variant={'subtitle2'}>
              {name}
            </Typography>
            <Typography as={'div'} className={s.userEmail} variant={'caption'}>
              {email}
            </Typography>
          </div>
        </div>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem asChild>
        <a href={profilePageHref}>
          <PersonOutline className={s.rightSlot} />
          My Profile
        </a>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem>
        <LogOut className={s.rightSlot} />
        Sing out
      </DropDownItem>
    </DropdownMenuComponent>
  )
}
