import { ComponentPropsWithoutRef } from 'react'

import * as RadixLabel from '@radix-ui/react-label'
import clsx from 'clsx'

import s from './label.module.scss'

type Props = ComponentPropsWithoutRef<typeof RadixLabel.Root>
export const Label = ({ children, className, ...rest }: Props) => (
  <RadixLabel.Root className={clsx(s.label, className)} {...rest}>
    {children}
  </RadixLabel.Root>
)
