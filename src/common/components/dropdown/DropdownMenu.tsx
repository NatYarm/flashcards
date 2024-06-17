import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

type DropdownMenuProps = {
  align?: 'center' | 'end' | 'start'
  children?: ReactNode
  sideOffset?: number
  trigger?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixDropdownMenu.Root>

export const DropdownMenu = ({
  align = 'end',
  children,
  sideOffset = 8,
  trigger,
  ...rest
}: DropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root {...rest}>
      <RadixDropdownMenu.Trigger className={s.trigger}>{trigger}</RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content align={align} className={s.content} sideOffset={sideOffset}>
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

export const DropdownMenuLabel = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>) => (
  <RadixDropdownMenu.Label className={clsx(s.label, className)} {...props} />
)
