import { ComponentPropsWithoutRef, ElementType, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { as: Component = 'div', children, className, ...rest } = props
  const classNames = clsx(s.root, className)

  return (
    <Component className={classNames} {...rest} ref={ref}>
      {children}
    </Component>
  )
})
