import { useForm } from 'react-hook-form'

import defaultCard from '@/assets/img/defaultCard.jpg'
import {
  Button,
  ControlledCheckbox,
  ControlledInputFile,
  ControlledTextField,
  Modal,
  ModalProps,
} from '@/common/components'
import { fileSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deckModal.module.scss'

const deckSchema = z.object({
  cover: z.union([fileSchema, z.string(), z.null()]).optional(),
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

export type DeckModalFormValues = z.infer<typeof deckSchema>

type Props = {
  cancelText?: string
  confirmText?: string
  defaultValues?: DeckModalFormValues
  onConfirm: (data: DeckModalFormValues) => void
} & Pick<ModalProps, 'onCancel' | 'onOpenChange' | 'open' | 'title'>

export const DeckModal = ({
  cancelText = 'Cancel',
  confirmText = 'OK',
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...modalProps
}: Props) => {
  const { control, handleSubmit, reset } = useForm<DeckModalFormValues>({
    defaultValues,
    resolver: zodResolver(deckSchema),
  })

  const handleCancel = () => {
    onCancel?.()
    reset()
  }
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    reset()
  })

  return (
    <Modal title={'Create New Deck'} {...modalProps}>
      <form className={s.modalContent} onSubmit={onSubmit}>
        <ControlledTextField control={control} label={'Deck Name'} name={'name'} />

        <ControlledInputFile control={control} defaultImage={defaultCard} name={'cover'} />

        <ControlledCheckbox control={control} label={'Private'} name={'isPrivate'} />

        <div className={s.buttonsContainer}>
          <Button onClick={handleCancel} variant={'secondary'}>
            {cancelText}
          </Button>

          <Button>{confirmText}</Button>
        </div>
      </form>
    </Modal>
  )
}
