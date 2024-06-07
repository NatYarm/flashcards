import React, { ComponentPropsWithRef, ReactNode } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './DropdownMenu.module.scss'

type DropdownMenuComponentProps = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithRef<typeof DropdownMenu.Root>

export const DropdownMenuComponent: React.FC<DropdownMenuComponentProps> = ({
  children,
  trigger,
  ...rest
}) => {
  return (
    <DropdownMenu.Root {...rest}>
      <DropdownMenu.Trigger style={{ cursor: 'pointer' }}>{trigger}</DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className={s.DropdownMenuContent} sideOffset={5}>
          {children}
          <DropdownMenu.Arrow className={s.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
