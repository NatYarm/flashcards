import { CSSProperties, ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import clsx from 'clsx'

import s from './layout.module.scss'

import { Header, HeaderProps } from './header/header'

type LayoutProps = { children: ReactNode } & HeaderProps

export const Layout = ({ children, ...headerPros }: LayoutProps) => {
  return (
    <div className={s.layout}>
      <Header {...headerPros} />
      <main className={s.mainContent}>{children}</main>
    </div>
  )
}
