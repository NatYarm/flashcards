import { ChangeEvent, useId, useRef, useState } from 'react'

type UsetTextFieldProps = {
  id?: string
  type?: string
  initialValue?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onValueChange?: (value: string) => void
  onClearInput?: () => void
}

export const useTextField = ({
  id,
  type = 'text',
  initialValue = '',
  onChange,
  onValueChange,
  onClearInput,
}: UsetTextFieldProps) => {
  const generatedId = useId()
  const finalId = id ?? generatedId
  const internalRef = useRef<HTMLInputElement>(null)

  const [revealPassword, setRevealPassword] = useState(false)
  const [inputValue, setInputValue] = useState(initialValue)

  const isPassword = type === 'password'
  const isSearchField = type === 'search'
  const showClearButton = isSearchField && inputValue !== ''
  const effectiveInputType = isPassword && revealPassword ? 'text' : type

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setInputValue(value)
    onChange?.(e)
    onValueChange?.(value)
  }

  const handleToggleShowPassword = () => {
    setRevealPassword(prev => !prev)
  }

  const handleClearInput = () => {
    onClearInput?.()

    if (internalRef.current) {
      internalRef.current.value = ''
      setInputValue('')
      onValueChange?.('')
    }
  }

  return {
    inputProps: {
      id: finalId,
      type: effectiveInputType,
      value: inputValue,
      onChange: handleChange,
    },
    internalRef,
    isPassword,
    isSearchField,
    showClearButton,
    revealPassword,
    handleToggleShowPassword,
    handleClearInput,
    finalId,
  }
}
