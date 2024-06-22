import { forwardRef } from 'react'

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

Avatar.displayName = 'Avatar'

/*import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './avatar.module.scss'

export type AvatarProps = {
  name?: string
  size?: CSSProperties['width']
} & ComponentPropsWithoutRef<'img'>

export const Avatar = ({ className, size = '36px', style, ...rest }: AvatarProps) => {
  return (
    <img
      className={clsx(className, s.avatar)}
      style={{
        ...style,
        height: size,
        width: size,
      }}
      {...rest}
    />
  )
}*/
