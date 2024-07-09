import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  ControlledTextFieldFile,
  Modal,
  ModalProps,
} from '@/common/components'
import { fileSchema } from '@/common/utils'
import { useCreateDeckMutation } from '@/features/decks/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deckModal.module.scss'

import defaultDeckImage from '../../../assets/img/defaultCard.jpg'

const deckSchema = z.object({
  cover: z.union([fileSchema, z.string(), z.null()]).optional(),
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

export type DeckModalFormValues = z.infer<typeof deckSchema>

type Props = {
  defaultValues?: DeckModalFormValues
  onConfirm: (data: DeckModalFormValues) => void
} & Pick<ModalProps, 'onCancel' | 'onOpenChange' | 'open' | 'title'>

export const DeckModal = ({
  defaultValues = { isPrivate: false, name: '' },
  onCancel,
  onConfirm,
  ...modalProps
}: Props) => {
  const [createDeck] = useCreateDeckMutation()
  const { control, handleSubmit, reset } = useForm<DeckModalFormValues>({
    defaultValues,
    resolver: zodResolver(deckSchema),
  })

  const handleCancel = () => {
    reset()
  }
  const onSubmit = handleSubmit(data => {
    onConfirm(data)
    modalProps.onOpenChange?.(false)
    reset()
  })

  // Объявление функции uploadImage
  const uploadImage = async (file: File): Promise<string> => {
    // Пример логики загрузки файла
    const response = await api.uploadFile(file)

    return response.url
  }

  return (
    <Modal onCancel={handleCancel} onConfirm={onSubmit} title={'Create new deck'} {...modalProps}>
      <form className={s.modalContent} onSubmit={onSubmit}>
        <ControlledTextField control={control} label={'Deck Name'} name={'name'} />
        <ControlledTextFieldFile
          control={control}
          defaultDeckImage={defaultDeckImage}
          name={'cover'}
          uploadImage={uploadImage} // Передача функции uploadImage
        />

        <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        <div className={s.buttonsContainer}>
          <Button onClick={() => modalProps.onOpenChange?.(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button>Add new deck</Button>
        </div>
      </form>
    </Modal>
  )
}

/*   2 вариант рабочий

import { useRef } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  ControlledCheckbox,
  ControlledTextField,
  ControlledTextFieldFile,
  Modal,
  ModalProps,
} from '@/common/components'
import { fileSchema } from '@/common/utils'
import { useCreateDeckMutation } from '@/features/decks/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './deckModal.module.scss'

import defaultDeckImage from '../../../assets/img/defaultCard.jpg'

const deckSchema = z.object({
  cover: z.union([fileSchema, z.string(), z.null()]).optional(),
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

export type DeckModalFormValues = z.infer<typeof deckSchema>

type Props = {
  defaultValues?: DeckModalFormValues
  onConfirm: (data: DeckModalFormValues) => void
} & Pick<ModalProps, 'onCancel' | 'onOpenChange' | 'open' | 'title'>

export const DeckModal = ({
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
        <ControlledTextFieldFile
          control={control}
          defaultDeckImage={defaultDeckImage}
          name={'cover'}
        />

        <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        <div className={s.buttonsContainer}>
          <Button onClick={() => modalProps.onOpenChange?.(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button>Add new deck</Button>
        </div>
      </form>
    </Modal>
  )
}*/

/*   1  вариант
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

import s from './deckModal.module.scss'

const deckSchema = z.object({
  cover: z.union([fileSchema, z.string(), z.null()]).optional(),
  isPrivate: z.boolean(),
  name: z.string().min(3).max(30),
})

export type DeckModalFormValues = z.infer<typeof deckSchema>

type Props = {
  defaultValues?: DeckModalFormValues
  onConfirm: (data: DeckModalFormValues) => void
} & Pick<ModalProps, 'onCancel' | 'onOpenChange' | 'open' | 'title'>

export const DeckModal = ({
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
        <ControlledCheckbox control={control} label={'Private pack'} name={'isPrivate'} />
        <div className={s.buttonsContainer}>
          <Button onClick={() => modalProps.onOpenChange?.(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button>Save Deck</Button>
        </div>
      </form>
    </Modal>
  )
}
*/
