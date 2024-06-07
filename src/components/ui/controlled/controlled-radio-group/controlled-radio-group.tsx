import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { RadioGroupComponent } from '@/components/ui/radioGroup'
import { RadioGroupComponentProps } from '@/components/ui/radioGroup/RadioGroupComponent'

export type ControlledRadioGroupProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<RadioGroupComponentProps, 'currentValue' | 'defaultValue' | 'setCurrentValue'>

export const ControlledRadioGroup = <TFieldValues extends FieldValues>(
  props: ControlledRadioGroupProps<TFieldValues>
) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return (
    <RadioGroupComponent {...props} {...field} currentValue={value} setCurrentValue={onChange} />
  )
}
