import { ComponentPropsWithRef, ElementType, ForwardedRef, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
} & ComponentPropsWithRef<T>

export const Card = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: ForwardedRef<T>) => {
    const { as: Component = 'div', children, className, ...restProps } = props
    const classNames = clsx(s.root, className)

    return (
      <Component className={classNames} {...restProps} ref={ref}>
        {children}
      </Component>
    )
  }
)
