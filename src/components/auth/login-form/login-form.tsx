import { ReactNode } from 'react'
import { useForm } from 'react-hook-form'

import { LoginFormProps, loginSchema } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'

import s from './login-form.module.scss'

type LoginFormComponentProps = {
  children?: ReactNode
}

export const LoginForm = ({ children }: LoginFormComponentProps) => {
  const { handleSubmit } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form className={s.loginForm} onSubmit={onSubmit}>
      {children}
    </form>
  )
}
