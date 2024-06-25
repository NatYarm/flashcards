import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/common/components'
import { clsx } from 'clsx'

import s from './defaultDescription.module.scss'

type Props = {
  text: string
} & ComponentPropsWithoutRef<'span'>
export const DefaultDescription = forwardRef<ElementRef<'span'>, Props>((props, ref) => {
  const { className, text, ...rest } = props

  return (
    <Typography
      as={'span'}
      className={clsx(s.text, className)}
      ref={ref}
      variant={'caption'}
      {...rest}
    >
      {text}
    </Typography>
  )
})

DefaultDescription.displayName = 'DefaultDescription'
