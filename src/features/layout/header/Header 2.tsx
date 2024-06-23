import logo from '@/assets/icons/logos/logo.png'

import s from './header.module.scss'

export type HeaderProps = {}

export const Header = () => {
  return (
    <header className={s.header}>
      <div className={s.content}>
        {/* <Link to={'/'}> */}

        <img className={s.logo} src={logo} />

        {/* </Link> */}
      </div>
    </header>
  )
}
