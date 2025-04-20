import { ComponentPropsWithoutRef, ElementRef, forwardRef, useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'

import defaultCardImage from '@/assets/img/defaultCard.jpg'
import {
  Button,
  ControlledFileInput,
  ControlledTextField,
  Modal,
  Select,
  Typography,
} from '@/common/components'
import { UpdateCardBody } from '@/common/types'
import { fileSchema, text } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { z } from 'zod'

import s from './cardModal.module.scss'

const cardSchema = z.object({
  answer: text,
  answerImg: z.union([fileSchema, z.string(), z.null()]).optional(),
  question: text,
  questionImg: z.union([fileSchema, z.string(), z.null()]).optional(),
})

export type CardModalFormValues = z.infer<typeof cardSchema>

type DataKey = keyof CardModalFormValues

type Props = {
  cancelText?: string
  confirmText?: string
  defaultValues?: UpdateCardBody
  onCancel?: () => void
  onConfirm: (data: CardModalFormValues) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  title: string
} & Omit<ComponentPropsWithoutRef<typeof DialogPrimitive.Root>, 'onOpenChange' | 'open'>

export const CardModal = forwardRef<ElementRef<typeof DialogPrimitive.Content>, Props>(
  (props, ref) => {
    const {
      cancelText = 'Cancel',
      confirmText = 'Add New Card',
      defaultValues,
      onCancel,
      onConfirm,
      onOpenChange,
      open,
      title,
    } = props

    const [selectedOption, setSelectedOption] = useState<string>('text')

    const { control, getValues, handleSubmit, reset } = useForm<CardModalFormValues>({
      defaultValues: {},
      resolver: zodResolver(cardSchema),
    })

    useEffect(() => {
      if (defaultValues) {
        reset(defaultValues)
        const startValue = defaultValues.questionImg || defaultValues.answerImg ? 'Image' : 'Text'

        setSelectedOption(startValue)
      } else {
        reset()
        setSelectedOption('Text')
      }
    }, [reset, defaultValues, open])

    const finalId = useId()

    const handleCancel = () => {
      onCancel?.()
      reset()
    }

    const onHandleSubmit = (data: CardModalFormValues) => {
      if (defaultValues) {
        const currentValues = getValues()

        for (const key in defaultValues) {
          if (defaultValues[key as DataKey] === currentValues[key as DataKey]) {
            delete data[key as DataKey]
          }
        }
      }

      onConfirm(data)

      onOpenChange(false)
      reset()
      setSelectedOption('Text')
    }

    const handleSelectChange = (value: string) => {
      setSelectedOption(value)
    }

    const isImage = selectedOption === 'Image'

    const selectOptions = [
      { label: 'Text', value: 'Text' },
      { label: 'Image', value: 'Image' },
    ]

    return (
      <Modal onOpenChange={onOpenChange} open={open} ref={ref} title={title}>
        <div className={s.container}>
          <div className={s.select}>
            <Select
              label={'Choose A Question Format'}
              onValueChange={handleSelectChange}
              options={selectOptions}
              value={selectedOption}
            />
          </div>
          <form className={s.form} id={finalId} onSubmit={handleSubmit(onHandleSubmit)}>
            <div className={s.item}>
              <Typography variant={'subtitle2'}>Question:</Typography>
              <ControlledTextField
                className={s.input}
                control={control}
                label={'Question'}
                name={'question'}
                placeholder={'Name'}
                type={'text'}
              />
              {isImage && (
                <ControlledFileInput
                  control={control}
                  defaultImage={defaultCardImage}
                  name={'questionImg'}
                />
              )}
            </div>
            <div className={s.item}>
              <Typography variant={'subtitle2'}>Answer:</Typography>
              <ControlledTextField
                className={s.input}
                control={control}
                label={'Answer'}
                name={'answer'}
                placeholder={'Name'}
                type={'text'}
              />
              {isImage && (
                <ControlledFileInput
                  control={control}
                  defaultImage={defaultCardImage}
                  name={'answerImg'}
                />
              )}
            </div>

            <div className={s.containerButton}>
              <Button onClick={handleCancel} type={'button'} variant={'secondary'}>
                {cancelText}
              </Button>
              <Button form={finalId} variant={'primary'}>
                {confirmText}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
)

CardModal.displayName = 'CardModal'
