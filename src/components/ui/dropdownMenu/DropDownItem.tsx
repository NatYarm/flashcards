import { ComponentPropsWithRef } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './DropdownMenu.module.scss'

type Props = ComponentPropsWithRef<typeof DropdownMenu.Item>

export const DropDownItem = ({ className, ...rest }: Props) => {
  return <DropdownMenu.Item className={clsx(s.DropdownMenuItem, className)} {...rest} />
}
