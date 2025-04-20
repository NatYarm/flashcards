import { ComponentPropsWithoutRef, forwardRef } from 'react'

import clsx from 'clsx'

import s from './avatar.module.scss'

export type AvatarProps = {
  name?: string
  src?: string
} & ComponentPropsWithoutRef<'img'>

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(({ className, ...rest }, ref) => {
  return (
    <div className={s.container}>
      <img className={clsx(className, s.img)} ref={ref} {...rest} />
    </div>
  )
})

Avatar.displayName = 'Avatar'
