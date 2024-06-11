import { Outlet } from 'react-router-dom'

import s from './layout.module.scss'

import { Header, HeaderProps } from './header/header'

//type LayoutProps = { children: ReactNode } & HeaderProps

export const Layout = ({ ...headerPros }: HeaderProps) => {
  return (
    <div className={s.layout}>
      <Header {...headerPros} />
      <main className={s.mainContent}>{<Outlet />}</main>
    </div>
  )
}
