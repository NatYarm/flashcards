import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Input, InputProps } from '@/components/ui/input'

export type ControlledInputProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<InputProps<'input'>, 'id' | 'onChange' | 'value'>

export const ControlledInput = <TFieldValues extends FieldValues>(
  props: ControlledInputProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return (
    <Input {...props} {...field} error={!!error} errorMessage={error?.message} id={props.name} />
  )
}
