import { ComponentPropsWithoutRef, useState } from 'react'

import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as RadixSelect from '@radix-ui/react-select'

import s from './select.module.scss'

type Props = { placeholder?: string } & ComponentPropsWithoutRef<typeof RadixSelect.Root>

export const Select = ({ children, placeholder, ...rest }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <RadixSelect.Root {...rest} onOpenChange={setOpen} open={open}>
      <RadixSelect.Trigger className={s.selectTrigger}>
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
