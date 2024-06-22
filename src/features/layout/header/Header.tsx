import { Link } from 'react-router-dom'

import logo from '@/assets/icons/logos/logo.png'
import { Button, Typography } from '@/common/components'
import { UserDropdown } from '@/common/components/dropdown/userDropdown'
import { path } from '@/common/enams'
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
    <header className={s.header} {...rest}>
      <div className={s.container}>
        <Typography as={Link} to={path.base}>
          <img alt={'logo'} className={s.logo} src={logo} />
        </Typography>

        {/* <Typography as={'b'} className={s.title}>
          <i>Educational Project</i>
        </Typography>*/}

        {isAuth ? (
          <UserDropdown
            avatar={avatar}
            email={email}
            name={name}
            onSelectLogOut={logOut}
            onSelectProfile={selectProfile}
          />
        ) : (
          <Button as={Link} to={path.signIn} variant={'secondary'}>
            Sign In
          </Button>
        )}
      </div>
    </header>
  )
}
