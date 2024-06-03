import { ComponentPropsWithoutRef, ElementType, LegacyRef, ReactNode, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './input.module.scss'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  children: ReactNode
  className?: string
  error?: boolean
  fullWidth?: boolean
  label?: string
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Input = forwardRef(
  <T extends ElementType = 'input'>(
    props: InputProps<T>,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const {
      as: Component = 'input',
      children,
      className,
      error,
      fullWidth,
      label,
      variant = 'primary',
      ...restProps
    } = props

    const classNames = clsx(
      s.input,
      s[variant],
      error && s.error,
      fullWidth && s.fullWidth,
      className
    )

    return (
      <div className={s.inputWrapper}>
        <label className={s.label}>
          {label}
          <Component className={classNames} ref={ref} {...restProps}>
            {children}
          </Component>
        </label>
        {error && <span style={{ color: 'red' }}>Error!</span>}
      </div>
    )
  }
)
