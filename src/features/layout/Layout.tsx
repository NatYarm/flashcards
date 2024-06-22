import { Outlet } from 'react-router-dom'

import { Loader } from '@/common/components'
import { ToastNotification } from '@/common/components/toastNotification/ToastNotification'
import { useGetMeQuery, useLogOutMutation } from '@/features/auth/api/authApi'

import s from './layout.module.scss'

import { Header, HeaderProps } from './header/Header'

export const Layout = ({ ...headerProps }: HeaderProps) => {
  const { data, isError, isLoading } = useGetMeQuery()
  const [logOut] = useLogOutMutation()
  const isAuth = !isError

  if (isLoading) {
    return (
      <div className={s.preloader}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={s.layout}>
      <Header
        avatar={data?.avatar}
        email={data?.email}
        isAuth={isAuth}
        logOut={logOut}
        name={data?.name}
        {...headerProps}
      />
      <ToastNotification />
      <main className={s.mainContent}>{<Outlet />}</main>
    </div>
  )
}
