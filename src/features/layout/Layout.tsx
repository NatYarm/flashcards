import { Outlet } from 'react-router-dom'

import { Loader } from '@/common/components'
import { ToastNotification } from '@/common/components/toastNotification/ToastNotification'
import { useGetMeQuery, useLogOutMutation } from '@/features/auth/api/authApi'
import { Header } from '@/features/layout/header/Header'

import s from './layout.module.scss'

export const Layout = () => {
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
      />
      <ToastNotification />
      <main className={s.mainContent}>{<Outlet context={isAuth} />}</main>
    </div>
  )
}

Layout.displayName = 'Layout'
