import { ComponentPropsWithoutRef } from 'react'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

import { Typography } from '../typography'

type Props = {
  className?: string
  label?: string
  placeholder?: string
} & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = ({ children, className, disabled, label, placeholder, ...rest }: Props) => {
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
        <RadixSelect.Trigger className={clsx(s.selectTrigger, className)} disabled={disabled}>
          <RadixSelect.Value placeholder={placeholder} />
          <RadixSelect.Icon className={s.selectIcon}>
            <ChevronDownIcon />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content className={s.selectContent} position={'popper'}>
            {children}
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </div>
  )
}
