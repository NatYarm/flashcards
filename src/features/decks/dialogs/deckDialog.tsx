import { useForm } from 'react-hook-form'

import { Image } from '@/assets/icons/components'
import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  Modal,
  ModalProps,
} from '@/common/components'
import { fileSchema } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deckDialog.module.scss'

const newDeckSchema = z.object({
  cover: z.union([fileSchema, z.string(), z.null()]).optional(),
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

type FormValues = z.infer<typeof newDeckSchema>

type Props = { defaultValues?: FormValues; onConfirm: (data: FormValues) => void } & Pick<
  ModalProps,
  'onCancel' | 'onOpenChange' | 'open' | 'title'
>

export const DeckDialog = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...modalProps
}: Props) => {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(newDeckSchema),
  })

  const handleCancel = () => {
    reset()
  }
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    modalProps.onOpenChange?.(false)
    reset()
  })

  return (
    <Modal onCancel={handleCancel} onConfirm={onSubmit} title={'Create new deck'} {...modalProps}>
      <form className={s.modalContent} onSubmit={onSubmit}>
        <ControlledTextField control={control} label={'Deck Name'} name={'name'} />
        <Button fullWidth variant={'secondary'}>
          <Image />
          Upload Image
        </Button>
        <ControlledCheckbox control={control} label={'Private'} name={'isPrivate'} />
        <div className={s.buttonsContainer}>
          <Button variant={'secondary'}>Cancel</Button>
          <Button>Create Deck</Button>
        </div>
      </form>
    </Modal>
  )
}
