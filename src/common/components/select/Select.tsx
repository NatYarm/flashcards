import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

import { Label } from '../label/Label'
import { SelectItem } from './selectItem'

export type SelectOptions = { label: string; value: string }

type SelectProps = {
  className?: string
  label?: string
  onValueChange: (value: string) => void
  options: SelectOptions[]
  placeholder?: string
  value: string
  variant?: 'default' | 'small'
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = forwardRef<ElementRef<typeof RadixSelect.Root>, SelectProps>((props, ref) => {
  const {
    className,
    disabled,
    label,
    onValueChange,
    options,
    placeholder,
    value,
    variant = 'default',
    ...rest
  } = props

  return (
    <div>
      {label && <Label className={disabled ? s.disabledSelectLabel : s.selectLabel}>{label}</Label>}
      <RadixSelect.Root onValueChange={onValueChange} value={value} {...rest}>
        <RadixSelect.Trigger
          className={clsx(s.selectTrigger, s[variant], className)}
          disabled={disabled}
          ref={ref}
        >
          <RadixSelect.Value placeholder={placeholder}>
            {value ? options.find(option => option.value === value)?.label : placeholder}
          </RadixSelect.Value>
          <RadixSelect.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={s.selectContent} position={'popper'}>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
})

Select.displayName = 'Select'

/*
import { ComponentPropsWithoutRef, ElementRef } from 'react'

import ForwardRef from '@/assets/icons/components/Check'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

import { Label } from '../label/Label'
import { SelectItem } from './selectItem'

export type SelectOptions = { label: string; value: string }

type SelectProps = {
  className?: string
  label?: string
  options: SelectOptions[]
  placeholder?: string
  variant?: 'default' | 'small'
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = ForwardRef<ElementRef<typeof SelectRadix.Root>, SelectProps>((props, ref) => {
  const {
    className,
    disabled,
    label,
    onValueChange,
    options,
    placeholder,
    value,
    variant = 'default',
    ...rest
  } = props

  return (
    <div>
      {label && <Label className={disabled ? s.disabledSelectLabel : s.selectLabel}>{label}</Label>}
      <RadixSelect.Root onValueChange={onValueChange} value={value} {...rest}>
        <RadixSelect.Trigger
          className={clsx(s.selectTrigger, s[variant], className)}
          disabled={disabled}
          ref={ref}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={s.selectContent} position={'popper'}>
            {options.map((option, index) => (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
})

/!*className,
  disabled,
  label,
  onValueChange,
  options,
  placeholder,
  value,
  variant = 'default',
  ...rest
}: Props) =>*!/

Select.displayName = 'Select'
*/
