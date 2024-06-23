import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components'
import * as RadixDialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

import { Typography } from '../typography'

export type ModalProps = {
  children: ReactNode
  onCancel?: () => void
  onConfirm?: () => void
  onOpenChange: (open: boolean) => void
  open?: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof RadixDialog.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, title, ...rest }: ModalProps) => {
  return (
    <RadixDialog.Root {...rest}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />
        <RadixDialog.Content className={s.content}>
          <RadixDialog.Description className={s.header}>
            <RadixDialog.Title asChild />
            <Typography as={'h2'} variant={'h2'}>
              {title}
            </Typography>
            <RadixDialog.Close className={s.closeButton}>
              <Close className={s.closeIcon} />
            </RadixDialog.Close>
          </RadixDialog.Description>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
