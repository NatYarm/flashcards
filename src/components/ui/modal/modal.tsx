import * as RadixDialog from '@radix-ui/react-dialog'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import s from './modal.module.scss'
import { Typography } from '../typography'
import { Close } from '@/assets/icons/components'

export type ModalProps = {
  children: ReactNode
  onOpenChange: (open: boolean) => void
  open: boolean
  title?: string
} & Omit<ComponentPropsWithoutRef<typeof RadixDialog.Dialog>, 'onOpenChange' | 'open'>

export const Modal = ({ children, title, ...props }: ModalProps) => {
  return (
    <RadixDialog.Root {...props}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={s.overlay} />
        <RadixDialog.Content className={s.content}>
          <RadixDialog.Description className={s.header}>
            <RadixDialog.Title asChild />
            <Typography as="h2" variant="h2">
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
