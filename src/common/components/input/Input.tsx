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
import { Typography } from '@/common/components/typography'
import { clsx } from 'clsx'

import s from './input.module.scss'

import { Label } from '../label/Label'

export type InputProps<T extends ElementType = 'input'> = {
  as?: T
  children?: ReactNode
  className?: string
  error?: boolean
  errorMessage?: string
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
      errorMessage,
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
        <Label className={s.label}>{label}</Label>
        <div className={s.inputContainer}>
          <Component
            className={classNames}
            onChange={handleChange}
            ref={ref}
            type={finalType}
            {...restProps}
          />
          {isRevealPasswordButtonShown && (
            <button className={s.showPassword} onClick={handleShowPasswordClick} type={'button'}>
              {revealPassword ? <EyeOffOutline /> : <EyeOutline />}
            </button>
          )}
        </div>
        {error && (
          <Typography className={'error'} variant={'error'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)
