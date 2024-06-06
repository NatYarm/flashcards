import React from 'react'

import {
  Edit2Outline,
  MoreVerticalOutline,
  PlayCircle,
  TrashOutline,
} from '@/assets/icons/components'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropdownMenu.module.scss'

type DropdownMenuComponentProps = {}
export const DropdownMenuComponent: React.FC<DropdownMenuComponentProps> = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <MoreVerticalOutline height={'18px'} width={'18px'} />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={s.DropdownMenuContent}>
        <DropdownMenu.Item className={s.DropdownMenuItem}>
          <div className={s.RightSlot}>
            <PlayCircle height={'16px'} width={'16px'} />
          </div>
          Learn
        </DropdownMenu.Item>
        <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
        <DropdownMenu.Item className={s.DropdownMenuItem}>
          <div className={s.RightSlot}>
            <Edit2Outline height={'16px'} width={'16px'} />
          </div>
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Separator className={s.DropdownMenuSeparator} />
        <DropdownMenu.Item className={s.DropdownMenuItem}>
          <div className={s.RightSlot}>
            <TrashOutline height={'16px'} width={'16px'} />
          </div>
          Delete
        </DropdownMenu.Item>

        <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
