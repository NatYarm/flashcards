import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

import { Typography } from '@/common/components'
import { clsx } from 'clsx'

import s from './containerImageText.module.scss'

type ContainerNameProps = {
  defaultImg?: string
  img: null | string
  link?: string
  text: string
} & ComponentPropsWithoutRef<'a'>
export const ContainerImageText = forwardRef<ElementRef<'a'>, ContainerNameProps>((props, ref) => {
  const { defaultImg, img, link, text, ...rest } = props

  const image = Boolean(img) || Boolean(defaultImg)

  return link ? (
    <div title={text}>
      <NavLink className={clsx(s.link, s.container)} ref={ref} to={link} {...rest}>
        {image && <img className={s.img} src={img || defaultImg} />}
        <Typography className={s.text}>{text}</Typography>
      </NavLink>
    </div>
  ) : (
    <div className={s.container} title={text}>
      {image && <img className={s.img} src={img || defaultImg} />}
      <Typography className={s.text}>{text}</Typography>
    </div>
  )
})

ContainerImageText.displayName = 'ContainerImageText'
