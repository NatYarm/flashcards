import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Close } from '@/assets/icons/components'
import * as RadixDialog from '@radix-ui/react-dialog'

import s from './modal.module.scss'

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
          <RadixDialog.Title className={s.header}>
            {title}
            <RadixDialog.Close asChild className={s.closeButton}>
              <Close className={s.closeIcon} />
            </RadixDialog.Close>
          </RadixDialog.Title>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
