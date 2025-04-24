import { ComponentPropsWithoutRef } from 'react'

import { Typography } from '@/common/components'
import { clsx } from 'clsx'

import s from './defaultDescription.module.scss'

type Props = {
  text: string
} & ComponentPropsWithoutRef<'span'>
export const DefaultDescription = ({ className, text, ...rest }: Props) => {
  return (
    <Typography as={'span'} className={clsx(s.text, className)} variant={'caption'} {...rest}>
      {text}
    </Typography>
  )
}

DefaultDescription.displayName = 'DefaultDescription'
