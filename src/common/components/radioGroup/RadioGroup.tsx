import React, { ComponentPropsWithoutRef } from 'react'

import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from './radioGroup.module.scss'

import { Typography } from '../typography'

type RadioItem = {
  disabled?: boolean
  label: string
  value: string
}

export type RadioGroupProps = {
  items: RadioItem[]
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof RadixRadioGroup.Root>

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadixRadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadixRadioGroup.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <RadixRadioGroup.Item className={clsx(s.item, className)} ref={ref} {...props}>
      <RadixRadioGroup.Indicator className={s.indicator} />
    </RadixRadioGroup.Item>
  )
})

export const RadioGroup = ({ items, orientation = 'vertical', ...rest }: RadioGroupProps) => {
  return (
    <RadixRadioGroup.Root className={s.root} orientation={orientation} {...rest}>
      {items.map(item => (
        <div className={s.itemWrapper} key={item.value}>
          <RadioGroupItem disabled={item.disabled} id={item.value} value={item.value} />

          <Typography
            as={'label'}
            className={item.disabled ? s.disabledLabel : ''}
            htmlFor={item.value}
            variant={'body2'}
          >
            {item.label}
          </Typography>
        </div>
      ))}
    </RadixRadioGroup.Root>
  )
}
