import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementType,
  LegacyRef,
  ReactNode,
  forwardRef,
  useState,
} from 'react'

import { EyeOffOutline, EyeOutline } from '@/assets/icons/components'
import { clsx } from 'clsx'

import s from './input.module.scss'

import { Label } from '../label/label'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  children: ReactNode
  className?: string
  error?: boolean
  fullWidth?: boolean
  label?: string
  onValueChange?: (value: string) => void
  variant?: 'primary' | 'secondary'
} & ComponentPropsWithoutRef<T>

export const Input = forwardRef(
  <T extends ElementType = 'input'>(
    props: InputProps<T>,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const [revealPassword, setRevealPassword] = useState(false)

    const {
      as: Component = 'input',
      children,
      className,
      error,
      fullWidth,
      label,
      onChange,
      onValueChange,
      type,
      variant = 'primary',
      ...restProps
    } = props

    const isRevealPasswordButtonShown = type === 'password'

    const classNames = clsx(
      s.input,
      s[variant],
      error && s.error,
      fullWidth && s.fullWidth,
      isRevealPasswordButtonShown && s.input__showpass,
      className
    )

    function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
      if (type === 'password' && showPassword) {
        return 'text'
      }

      return type
    }
    const finalType = getFinalType(type, revealPassword)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const handleShowPasswordClick = () => {
      setRevealPassword((prevState: boolean) => !prevState)
    }

    return (
      <div className={s.inputWrapper}>
        <Label className={s.label}>
          {label}
          <Component
            className={classNames}
            onChange={handleChange}
            ref={ref}
            // style={{ paddingRight: '50px' }}
            type={finalType}
            {...restProps}
          >
            {children}
          </Component>
        </Label>
        {isRevealPasswordButtonShown && (
          <button className={s.showPassword} onClick={handleShowPasswordClick} type={'button'}>
            {revealPassword ? (
              <EyeOffOutline height={'20px'} width={'20px'} />
            ) : (
              <EyeOutline height={'20px'} width={'20px'} />
            )}
          </button>
        )}
        {error && <span style={{ color: 'red' }}>Error!</span>}
      </div>
    )
  }
)
