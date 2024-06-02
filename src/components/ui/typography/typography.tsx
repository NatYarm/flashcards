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

// Базовый тип без рекурсивного использования Omit
type BaseTypographyProps<T extends ElementType> = {
  as?: T
  className?: string
  variant?: TypographyVariants
}

// Итоговый тип, объединяющий базовый тип и стандартные пропсы
type TypographyProps<T extends ElementType = 'p'> = BaseTypographyProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof BaseTypographyProps<T>>

export const Typography = <T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  ...rest
}: TypographyProps<T>) => {
  const Component = as || 'p' // Уточнение типа

  const classNames = clsx(s.typography, s[variant], className)

  return <Component className={classNames} {...rest} />
}

/*export interface TypographyProps<T extends ElementType = 'p'> {
  as?: T
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
}

export function Typography<T extends ElementType = 'p'>({
  as,
  className,
  variant = 'body1',
  ...restProps
}: Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & TypographyProps<T>) {
  const classNames = clsx(s.text, s[variant], className)
  const Component = as || 'p'

  return <Component className={classNames} {...restProps} />
}*/

/*type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  className?: string
  variant?:
    | 'body1'
    | 'body2'
    | 'caption'
    | 'error'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'link1'
    | 'link2'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyProps<T>) => {
  const { as: Component = 'p', className, variant = 'body1', ...rest } = props

  const classNames = clsx(s.typography, s[variant], className)

  return <Component className={classNames} {...rest} />
}*/
