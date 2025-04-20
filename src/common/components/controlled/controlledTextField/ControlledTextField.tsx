import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/common/components/textField'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
} & Omit<TextFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextField = <TFieldValues extends FieldValues>(
  props: ControlledTextFieldProps<TFieldValues>
) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control: props.control,
    name: props.name,
  })

  return <TextField {...props} {...field} errorMessage={error?.message} id={props.name} />
}

{
  /* <AuthForm title="Sign Up" type="signup">
<TextField label="username" />
<TextField label="email" />
<TextField label="password" type="password" />
<TextField label="confirm password" type="password" />
<Checkbox label="I agree to the Terms of Service and Privacy" />
</AuthForm> */
}
