import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormCheckbox } from '@/components/ui/form/form-checkbox'
import { TextField } from '@/components/ui/text-field'
import { LoginFormProps, loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './login-form.module.scss'

export const LoginForm = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form className={s.loginForm} onSubmit={onSubmit}>
      <TextField
        {...register('email')}
        errorMessage={errors.email?.message}
        label={'Email'}
        placeholder={'Email'}
      />
      <TextField
        {...register('password')}
        errorMessage={errors.password?.message}
        label={'Password'}
        placeholder={'Password'}
        type={'password'}
      />
      <FormCheckbox control={control} label={'Remember me'} name={'rememberMe'} />
      <Button type={'submit'}>Submit</Button>
    </form>
  )
}
