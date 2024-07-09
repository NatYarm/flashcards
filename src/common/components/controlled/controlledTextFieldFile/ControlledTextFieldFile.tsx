import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  KeyboardEvent,
  useId,
  useRef,
  useState,
} from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { ImageOutline, TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/components'
import { Button } from '@/common/components/button/Button'

import s from './controlledTextFieldFile.module.scss'

// Типы для пропсов компонента
type Props<T extends FieldValues> = {
  uploadImage: (file: File) => Promise<string>
} & { defaultDeckImage?: string } & Omit<
    ComponentPropsWithoutRef<'input'>,
    'name' | 'onBlur' | 'onChange' | 'value'
  > &
  UseControllerProps<T>

export const ControlledTextFieldFile = <T extends FieldValues>(props: Props<T>) => {
  const { control, defaultDeckImage, id, name, uploadImage, ...rest } = props
  const [preview, setPreview] = useState<null | string>(null)
  const ref = useRef<ElementRef<'label'> | null>(null)
  const idInput = useId()
  const finalId = id || idInput
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({ control, name })

  const onEnterPress = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      ref.current?.click()
    }
  }

  const onChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (preview) {
      URL.revokeObjectURL(preview) // освобождение памяти выделенной для предыдущего URL
    }
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Загрузка файла на сервер и получение URL
      const uploadedImageUrl = await uploadImage(file)

      setPreview(uploadedImageUrl)
      onChange(uploadedImageUrl)
    }
  }

  const onClickClear = () => {
    onChange(null)
    setPreview(null)
  }

  const displayImage = preview || value || defaultDeckImage

  return (
    <div className={s.container}>
      <div>
        <img alt={'no picture'} className={s.img} src={displayImage} />
        {Boolean(error?.message) && (
          <Typography as={'span'} className={s.error} variant={'error'}>
            {error?.message}
          </Typography>
        )}
      </div>
      <div className={s.containerButton}>
        {value && (
          <Button onClick={onClickClear} type={'button'} variant={'secondary'}>
            Delete <TrashOutline />
          </Button>
        )}
        <Button fullWidth onKeyDown={onEnterPress} type={'button'} variant={'secondary'}>
          <label className={s.label} htmlFor={finalId} ref={ref}>
            <ImageOutline /> Upload Image
            <input
              accept={'image/*'}
              className={s.file}
              type={'file'}
              {...field}
              {...rest}
              aria-label={'Upload Cover Image'}
              id={finalId}
              onChange={onChangeFile}
            />
          </label>
        </Button>
      </div>
    </div>
  )
}

ControlledTextFieldFile.displayName = 'ControlledInputFile'

/*  2 вариант рабочий

import {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ElementRef,
  KeyboardEvent,
  useId,
  useRef,
  useState,
} from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { ImageOutline, TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/components'
import { Button } from '@/common/components/button/Button'

import s from './controlledTextFieldFile.module.scss'

type Props<T extends FieldValues> = { defaultDeckImage?: string } & Omit<
  ComponentPropsWithoutRef<'input'>,
  'name' | 'onBlur' | 'onChange' | 'value'
> &
  UseControllerProps<T>

export const ControlledTextFieldFile = <T extends FieldValues>(props: Props<T>) => {
  const { control, defaultDeckImage, id, name, ...rest } = props
  const [preview, setPreview] = useState<null | string>(null)
  const ref = useRef<ElementRef<'label'> | null>(null)
  const idInput = useId()
  const finalId = id || idInput
  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({ control, name })

  const onEnterPress = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      ref.current?.click()
    }
  }

  const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    if (e.target.files) {
      const img = URL.createObjectURL(e.target.files[0])

      setPreview(img)
      onChange(img)
    }

    onChange(e.target.files && e.target.files[0])
  }

  const onClickClear = () => {
    onChange(null)
    setPreview(null)
  }

  const displayImage = preview || value || defaultDeckImage

  return (
    <div className={s.container}>
      <div>
        <img alt={'no picture'} className={s.img} src={displayImage} />
        {Boolean(error?.message) && (
          <Typography as={'span'} className={s.error} variant={'error'}>
            {error?.message}
          </Typography>
        )}
      </div>
      <div className={s.containerButton}>
        {value && (
          <Button onClick={onClickClear} type={'button'} variant={'secondary'}>
            Delete <TrashOutline />
          </Button>
        )}
        <Button fullWidth onKeyDown={onEnterPress} type={'button'} variant={'secondary'}>
          <label className={s.label} htmlFor={finalId} ref={ref}>
            <ImageOutline /> Upload Image
            <input
              accept={'image/!*'}
              className={s.file}
              type={'file'}
              {...field}
              {...rest}
              aria-label={'Upload Cover Image'}
              id={finalId}
              onChange={onChangeFile}
            />
          </label>
        </Button>
      </div>
    </div>
  )
}

ControlledTextFieldFile.displayName = 'ControlledInputFile'*/

/*
import { ChangeEvent, useRef, useState } from 'react'

import { ImageOutline } from '@/assets/icons/components'
import { Button } from '@/common/components/button/Button'

import s from './controlledTextFieldFile.module.scss'

// Типы для пропсов компонента
export type ImageUploaderProps = {
  onImageUpload: (url: string) => void // Callback для обработки загруженного изображения
  uploadImage: (file: File) => Promise<string> // Функция для загрузки изображения, возвращающая URL
}

export const ControlledTextFieldFile = ({ onImageUpload, uploadImage }: ImageUploaderProps) => {
  const [preview, setPreview] = useState<null | string>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Загрузка файла на сервер и получение URL
      const uploadedImageUrl = await uploadImage(file)

      setPreview(uploadedImageUrl)
      onImageUpload(uploadedImageUrl)
    }
  }

  return (
    <div className={s.container}>
      <div className={s.photoContainer}>
        {preview && <img alt={'no picture'} className={s.img} src={preview} />}
      </div>
      <div className={s.containerButton}>
        <Button
          fullWidth
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          type={'button'}
          variant={'secondary'}
        >
          <ImageOutline /> Upload Image
        </Button>
        <input
          accept={'image/!*'}
          className={s.file}
          onChange={handleChangeFile}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </div>
    </div>
  )
}

ControlledTextFieldFile.displayName = 'ImageUploader'
*/
