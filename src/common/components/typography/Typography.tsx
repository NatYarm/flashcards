import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import clsx from 'clsx'

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

type Props<T extends ElementType = 'p'> = {
  as?: T
  className?: string
  variant?: TypographyVariants
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'variant' | 'className'>

export function Typography<T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  children,
  ...restProps
}: Props<T>) {
  const Component = as || 'p'
  const classNames = clsx(s.typography, s[variant], className)

  return (
    <Component className={classNames} {...restProps}>
      {children}
    </Component>
  )
}

Typography.displayName = 'Typography'
