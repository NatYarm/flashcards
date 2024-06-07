import {
  Edit2Outline,
  MoreVerticalOutline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/icons/components'

import s from './DropdownMenu.module.scss'

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
export const Example2DropDown = ({ profilePageHref }: Props) => {
  return (
    <DropdownMenuComponent trigger={<MoreVerticalOutline />}>
      <DropDownItem asChild>
        <a href={profilePageHref}>
          <PlayCircleOutline className={s.rightSlot} />
          Learn
        </a>
      </DropDownItem>
      <DropDownSeparator />
      <DropDownItem>
        <a href={profilePageHref}>
          <Edit2Outline className={s.rightSlot} viewBox={'0 -8 24 24'} />
          Edit
        </a>
      </DropDownItem>
      <DropDownSeparator />

      <DropDownItem>
        <a href={profilePageHref}>
          <TrashOutline className={s.rightSlot} viewBox={'0 -8 24 24'} />
          Delete
        </a>
      </DropDownItem>
    </DropdownMenuComponent>
  )
}
