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

  const inputFileRef = useRef<HTMLInputElement | null>(null)

  const idInput = useId()
  const finalId = id || idInput
  const {
    field: { onChange, ref: controllerRef, value, ...field },
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
    if (e.target.files && e.target.files[0]) {
      const img = URL.createObjectURL(e.target.files[0])

      setPreview(img)
      onChange(e.target.files[0])
    }
  }

  const onClickClear = () => {
    onChange(null)
    setPreview(null)

    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  const setInputRefs = (e: HTMLInputElement | null) => {
    inputFileRef.current = e // Установка ref для input
    controllerRef(e) // Передача ref в react-hook-form
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
              ref={setInputRefs}
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
