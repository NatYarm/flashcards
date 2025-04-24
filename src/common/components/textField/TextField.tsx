import { ComponentProps, ComponentPropsWithoutRef, forwardRef } from 'react'

import { Typography } from '@/common/components'
import { mergeRefs } from '@/common/utils/mergeRefs'
import { clsx } from 'clsx'
import { FiEye, FiEyeOff, FiSearch } from 'react-icons/fi'
import { IoCloseOutline as Close } from 'react-icons/io5'

import s from './textField.module.scss'

import { useTextField } from './useTextField'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  onClearInput?: () => void
  onValueChange?: (value: string) => void
} & ComponentPropsWithoutRef<'input'>

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      containerProps,
      errorMessage,
      id,
      label,
      labelProps,
      onChange,
      onClearInput,
      onValueChange,
      placeholder,
      type = 'text',
      value,
      ...restProps
    },
    forwardedRef
  ) => {
    const {
      inputProps,
      internalRef,
      isPassword,
      isSearchField,
      showClearButton,
      revealPassword,
      handleToggleShowPassword,
      handleClearInput,
      finalId,
    } = useTextField({
      id,
      type,
      initialValue: value as string,
      onChange,
      onValueChange,
      onClearInput,
    })
    const finalRef = mergeRefs([forwardedRef, internalRef])

    const classNames = {
      root: clsx(s.root, containerProps?.className),
      label: clsx(s.label, labelProps?.className),
      fieldContainer: clsx(s.fieldContainer),
      field: clsx(s.field, !!errorMessage && s.error, isSearchField && s.hasLeadingIcon, className),
      error: clsx(s.error),
      leadingIcon: s.leadingIcon,
    }

    return (
      <div {...containerProps} className={classNames.root}>
        {label && (
          <Typography
            as={'label'}
            className={classNames.label}
            htmlFor={finalId}
            variant={'body2'}
            {...labelProps}
          >
            {label}
          </Typography>
        )}

        <div className={classNames.fieldContainer}>
          {isSearchField && (
            <FiSearch
              className={classNames.leadingIcon}
              onClick={() => internalRef.current?.focus()}
            />
          )}

          <input
            {...inputProps}
            placeholder={placeholder}
            className={classNames.field}
            ref={finalRef}
            {...restProps}
          />

          {isPassword && (
            <button className={s.showPassword} onClick={handleToggleShowPassword} type={'button'}>
              {revealPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          )}

          {showClearButton && (
            <button className={s.clearInput} onClick={handleClearInput} type={'button'}>
              <Close height={16} width={16} />
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
