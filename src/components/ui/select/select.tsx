import { ComponentPropsWithoutRef } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

import { Typography } from '../typography'
import { SelectItem } from './selectItem'

export type SelectOptions = { label: string; value: string }

type Props = {
  className?: string
  label?: string
  options: SelectOptions[]
  placeholder?: string
  variant?: 'default' | 'small'
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = ({
  children,
  className,
  disabled,
  label,
  options,
  placeholder,
  variant = 'default',
  ...rest
}: Props) => {
  return (
    <div>
      {label && (
        <Typography
          as={'label'}
          className={disabled ? s.disabledSelectLabel : s.selectLabel}
          variant={'body2'}
        >
          {label}
        </Typography>
      )}
      <RadixSelect.Root {...rest}>
        <RadixSelect.Trigger
          className={clsx(s.selectTrigger, s[variant], className)}
          disabled={disabled}
        >
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={s.selectContent} position={'popper'}>
            {options.map((opt, idx) => (
              <SelectItem key={idx} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}
