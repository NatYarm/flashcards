import { clsx } from 'clsx'

import s from './card.module.scss'

export type CardProps<T extends ElementType = 'div'> = {
  as?: T
  children: ReactNode

export const Card = forwardRef(
    const { as: Component = 'div', children, className, ...restProps } = props
    const classNames = clsx(s.root, className)

    return (
      <Component className={classNames} {...restProps} ref={ref}>
        {children}
      </Component>
    )
  }
)
