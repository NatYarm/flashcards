import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactElement,
  ReactNode,
  forwardRef,
} from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type InferType<T> = T extends ElementType<infer U> ? U : never

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Card = forwardRef(
  <T extends ElementType = 'div'>(props: CardProps<T>, ref: ForwardedRef<InferType<T>>) => {
    const { as: Component = 'div', children, className, ...restProps } = props
    const classNames = clsx(s.root, className)

    return (
      <Component className={classNames} {...restProps} ref={ref}>
        {children}
      </Component>
    )
  }
)

export default Card as <T extends ElementType = 'div'>(
  props: {
    ref?: ForwardedRef<ElementRef<T>>
  } & CardProps<T>
) => ReactElement
