import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

type DropdownMenuProps = {
  children?: ReactNode
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixDropdownMenu.Root>

export const DropdownMenu = ({ children, trigger, ...rest }: DropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root {...rest}>
      <RadixDropdownMenu.Trigger>{trigger}</RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content className={s.content} sideOffset={5}>
          {children}
          <RadixDropdownMenu.Arrow className={s.arrow} />
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}

export const DropdownSeparator = ({
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Separator>) => {
  return <RadixDropdownMenu.Separator className={clsx(s.separator, className)} {...rest} />
}
