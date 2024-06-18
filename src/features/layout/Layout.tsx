import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header, HeaderProps } from './header/Header'

export const Layout = ({ ...headerProps }: HeaderProps) => {
  return (
    <div className={s.layout}>
      <Header {...headerProps} />
      <main className={s.mainContent}>{<Outlet />}</main>
    </div>
  )
}
