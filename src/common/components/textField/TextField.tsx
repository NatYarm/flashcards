import {
  ChangeEvent,
  ComponentProps,
  ComponentPropsWithoutRef,
  forwardRef,
  useId,
  useRef,
  useState,
} from 'react'

import { Close, Eye, EyeOffOutline, Search } from '@/assets/icons/components'
import { Typography } from '@/common/components/typography'
import { mergeRefs } from '@/common/utils/mergeRefs'
// import { mergeRefs } from '@/utils'
import { clsx } from 'clsx'

import s from './textField.module.scss'

export type TextFieldProps = {
  containerProps?: ComponentProps<'div'>
  errorMessage?: string
  label?: string
  labelProps?: ComponentProps<'label'>
  /**
   * Callback that is called when the clear button is clicked
   * If not provided clears the internal value via ref and calls onValueChange with an empty string
   */
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
      type,
      ...restProps
    },
    forwardedRef
  ) => {
    const generatedId = useId()
    const finalId = id ?? generatedId
    const internalRef = useRef<HTMLInputElement>(null)
    const finalRef = mergeRefs([forwardedRef, internalRef])
    const [revealPassword, setRevealPassword] = useState(false)
    const [inputValue, setInputValue] = useState('')

    const isRevealPasswordButtonShown = type === 'password'
    const isSearchField = type === 'search'
    const isClearInputButtonShown = isSearchField && inputValue !== ''

    const finalType = getFinalType(type, revealPassword)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const value = e.target.value

      //console.log('Input Value:', value)
      setInputValue(value)
      onChange?.(e)
      onValueChange?.(value)
    }

    function handleToggleShowPassword() {
      setRevealPassword((prevState: boolean) => !prevState)
    }

    // function handleClearInput() {
    //   console.log('Clearing input...') // Debug statement
    //   if (onClearInput) {
    //     return onClearInput()
    //   } else {
    //     if (internalRef.current) {
    //       setInputValue('')
    //       internalRef.current.value = ''
    //       onValueChange?.('')
    //     }
    //   }
    // }

    function handleClearInput() {
      if (onClearInput) {
        onClearInput()
      }

      if (!internalRef.current) {
        return
      }
      internalRef.current.value = ''
      setInputValue('')
      onValueChange?.('')
    }

    // console.log('Input Value:', inputValue) // Debug statement

    const classNames = {
      error: clsx(s.error),
      field: clsx(s.field, !!errorMessage && s.error, isSearchField && s.hasLeadingIcon, className),
      fieldContainer: clsx(s.fieldContainer),
      label: clsx(s.label, labelProps?.className),
      leadingIcon: s.leadingIcon,
      root: clsx(s.root, containerProps?.className),
    }

    return (
      <div {...containerProps} className={classNames.root}>
        {label && (
          <Typography
            {...labelProps}
            as={'label'}
            className={classNames.label}
            htmlFor={finalId}
            variant={'body2'}
          >
            {label}
          </Typography>
        )}
        <div className={classNames.fieldContainer}>
          {isSearchField && (
            <Search
              className={classNames.leadingIcon}
              onClick={() => internalRef.current?.focus()}
            />
          )}
          <input
            className={classNames.field}
            id={finalId}
            onChange={handleChange}
            placeholder={placeholder}
            ref={finalRef}
            type={finalType}
            value={inputValue}
            {...restProps}
          />
          {isRevealPasswordButtonShown && (
            <button className={s.showpassword} onClick={handleToggleShowPassword} type={'button'}>
              {revealPassword ? <EyeOffOutline /> : <Eye />}
            </button>
          )}
          {isClearInputButtonShown && (
            <button className={s.clearInput} onClick={handleClearInput} type={'button'}>
              <Close height={16} width={16} />
            </button>
          )}
        </div>

        <Typography className={classNames.error} variant={'error'}>
          {errorMessage}
        </Typography>
      </div>
    )
  }
)

function getFinalType(
  type: ComponentProps<'input'>['type'],
  showpassword: boolean
): ComponentProps<'input'>['type'] {
  if (type === 'password' && showpassword) {
    return 'text'
  }

  return type
}
