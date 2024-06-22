import logo from '@/assets/icons/logos/logo.png'
import { Button, Typography } from '@/common/components'
import { path } from '@/common/enams'
import { UserDropdown } from '@/features/layout/header/userDropdown'
import { router } from '@/router'

import s from './header.module.scss'

export type HeaderProps = {
  avatar?: string
  email?: string
  isAuth: boolean
  logOut: () => void
  name?: string
}

export const Header = (props: HeaderProps) => {
  const { avatar, email, isAuth, logOut, name, ...rest } = props

  const selectProfile = () => {
    router.navigate(path.profile)
  }

  return (
    <header className={classNames(s.container)} {...rest}>
      <Typography as={'a'} className={s.link} href={path.base}>
        <img alt={'logo'} className={s.img} src={logo} />
      </Typography>

      <Typography as={'b'} className={s.title}>
        <i>Educational Project</i>
      </Typography>

      {isAuth ? (
        <UserDropdown
          email={email}
          img={avatar}
          name={name}
          onSelectLogOut={logOut}
          onSelectProfile={selectProfile}
        />
      ) : (
        <Button as={'a'} href={path.signIn} variant={'secondary'}>
          Sign In
        </Button>
      )}
    </header>

    /*<header className={s.header}>
      <div className={s.content}>
        {/!* <Link to={'/'}> *!/}

        <img className={s.logo} src={logo} />

        {/!* </Link> *!/}
      </div>
    </header>*/
  )
}
