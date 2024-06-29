import { ChangeEvent, KeyboardEvent, useId, useRef, useState } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { ImageOutline, TrashOutline } from '@/assets/icons/components'
import { Typography } from '@/common/components'
import { Button } from '@/common/components/button/Button'
import { TextField, TextFieldProps } from '@/common/components/textField'

import s from './controlledTextFieldFile.module.scss'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  defaultDeckImage?: string
  name: FieldPath<TFieldValues>
} & Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextFieldFile = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const { control, defaultDeckImage, name, ...rest } = props
  const [preview, setPreview] = useState<null | string>(null)
  const ref = useRef<HTMLLabelElement | null>(null)
  const idInput = useId()
  const finalId = idInput

  const {
    field: { onChange, value, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

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
      <TextField {...rest} {...field} errorMessage={error?.message} id={props.name} />
    </div>
  )
}

ControlledTextFieldFile.displayName = 'ControlledTextFieldFile'
