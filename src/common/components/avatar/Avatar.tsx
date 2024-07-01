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

/*import { forwardRef } from 'react'

import s from './avatar.module.scss'

type Props = {
  name?: string
  src?: string
}
export const Avatar = forwardRef<HTMLDivElement, Props>(({ name = '', src }, ref) => {
  const img = src ? src : `https://ui-avatars.com/api/?name=${name}`

  return (
    <div className={s.container} ref={ref}>
      <img alt={'User photo'} className={s.img} src={img} />
    </div>
  )
})

Avatar.displayName = 'Avatar'*/
