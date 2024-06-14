import { ChangeEvent, ComponentProps, ComponentPropsWithoutRef, forwardRef, useState } from 'react'

import { EyeOffOutline, EyeOutline } from '@/assets/icons/components'
import { Typography } from '@/components/ui/typography'
import { Label } from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './text-field.module.scss'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      children,
      className,
      containerProps,
      errorMessage,
      label,
      labelProps,
      onChange,
      onValueChange,
      placeholder,
      type,
      ...restProps
    },
    ref
  ) => {
    const [revealPassword, setRevealPassword] = useState(false)

    const isRevealPasswordButtonShown = type === 'password'

    const finalType = getFinalType(type, revealPassword)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const handleShowPasswordClick = () => {
      setRevealPassword((prevState: boolean) => !prevState)
    }

    const classNames = {
      error: clsx(s.error),
      field: clsx(s.field, errorMessage && s.error, className),
      fieldContainer: clsx(s.fieldContainer),
      label: clsx(s.label, labelProps?.className),
      root: clsx(s.root, containerProps?.className),
    }

    return (
      <div className={classNames.root}>
        {label && (
          <Label {...labelProps} className={classNames.label} htmlFor={restProps.id}>
            {label}
          </Label>
        )}
        <div className={classNames.fieldContainer}>
          {children && <div className={s.icon}>{children}</div>}
          <input
            className={classNames.field}
            onChange={handleChange}
            placeholder={placeholder}
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
        {errorMessage && (
          <Typography className={classNames.error} variant={'error'}>
            {errorMessage}
          </Typography>
        )}
      </div>
    )
  }
)

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }

  return type
}
