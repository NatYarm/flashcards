import { ComponentPropsWithoutRef, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'
import clsx from 'clsx'

import s from './select.module.scss'

type Props = { className?: string; placeholder?: string } & ComponentPropsWithoutRef<
  typeof RadixSelect.Root
>

export const Select = ({ children, className, placeholder, ...rest }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <RadixSelect.Root {...rest} onOpenChange={setOpen} open={open}>
      <RadixSelect.Trigger className={clsx(s.selectTrigger, className)}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className={s.selectContent} position={'popper'}>
          {children}
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}
