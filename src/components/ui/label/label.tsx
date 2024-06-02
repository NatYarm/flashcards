import { ComponentPropsWithoutRef } from 'react'

import * as RadixLabel from '@radix-ui/react-label'
import clsx from 'clsx'

import s from './label.module.scss'

import { Typography } from '../typography'

type Props = ComponentPropsWithoutRef<typeof RadixLabel.Root>
export const Label = ({ children, className, ...rest }: Props) => (
  <RadixLabel.Root className={clsx(s.labelRoot, className)} {...rest}>
    <Typography className={s.label} variant={'body2'}>
      {children}
    </Typography>
  </RadixLabel.Root>
)
