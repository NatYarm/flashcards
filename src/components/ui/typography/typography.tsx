import { ComponentPropsWithoutRef, ElementType } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

type TypographyVariants =
  | 'body1'
  | 'body2'
  | 'caption'
  | 'error'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'large'
  | 'link1'
  | 'link2'
  | 'overline'
  | 'subtitle1'
  | 'subtitle2'

type BaseTypographyProps<T extends ElementType> = {
  as?: T
  className?: string
  variant?: TypographyVariants
}

type TypographyProps<T extends ElementType = 'p'> = BaseTypographyProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BaseTypographyProps<T>>

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  ...rest
}: TypographyProps<T>) => {
  const Component = as || 'p'

  const classNames = clsx(s.typography, s[variant], className)

  return <Component className={classNames} {...rest} />
}
