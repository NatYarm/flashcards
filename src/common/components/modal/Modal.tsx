import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { Close } from '@/assets/icons/components'
import { Typography } from '@/common/components'
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

export const Modal = forwardRef<ElementRef<typeof RadixDialog.Content>, ModalProps>(
  ({ children, title, ...rest }, ref) => {
    return (
      <RadixDialog.Root {...rest}>
        <RadixDialog.Portal>
          <RadixDialog.Overlay className={s.overlay} />
          <RadixDialog.Content className={s.content} ref={ref}>
            <div className={s.header}>
              <RadixDialog.Title asChild>
                <Typography as={'h2'} variant={'h2'}>
                  {title}
                </Typography>
              </RadixDialog.Title>
              <RadixDialog.Close asChild className={s.closeButton}>
                <Close className={s.closeIcon} />
              </RadixDialog.Close>
            </div>
            {children}
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    )
  }
)

Modal.displayName = 'Modal'
