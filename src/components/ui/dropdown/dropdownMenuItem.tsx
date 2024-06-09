import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

import s from './dropdown.module.scss'

export const DropdownMenuItem = forwardRef<
  ElementRef<typeof RadixDropdownMenu.Item>,
  ComponentPropsWithoutRef<typeof RadixDropdownMenu.Item>
>(({ className, ...rest }, ref) => (
  <RadixDropdownMenu.Item className={clsx(s.dropdownMenuItem, className)} ref={ref} {...rest} />
))
