import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { RadioGroup, RadioGroupProps } from '../../radioGroup'

export type ControlledRadioGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<RadioGroupProps, 'id' | 'onChange' | 'value'>

export const ControlledRadioGroup = <TFieldValues extends FieldValues>(
  props: ControlledRadioGroupProps<TFieldValues>
) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return <RadioGroup {...props} {...field} id={props.name} onValueChange={onChange} />
}
