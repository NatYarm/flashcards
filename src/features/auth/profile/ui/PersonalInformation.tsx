import { useState } from 'react'

import Edit from '@/assets/icons/components/Edit'
import LogOut from '@/assets/icons/components/LogOut'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { Input } from '@/common/components/input'
import { Typography } from '@/common/components/typography'

import s from './personalInformation.module.scss'

type Props = {
  avatar: string
  email: string
  name: string
  onAvatarChange: (newAvatar: string) => void
  onLogout: () => void
  onNameChange: (newName: string) => void
}
export const PersonalInformation = ({
  avatar,
  email,
  name,
  onAvatarChange,
  onLogout,
  onNameChange,
}: Props) => {
  const [isEditingName, setIsEditingName] = useState(false)

  const handleAvatarChanged = () => {
    onAvatarChange('new Avatar')
  }
  const handleNameChanged = () => {
    /*onNameChange('New name')*/
    setIsEditingName(true)
  }
  const handleLogout = () => {
    onLogout()
  }
  const saveNameChanged = () => {
    setIsEditingName(false)
    onNameChange('New name')
  }

  return (
    <Card className={s.card}>
      <Typography className={s.title} variant={'h1'}>
        Personal Information
      </Typography>
      <div className={s.photoContainer}>
        <div>
          <img alt={'avatar'} src={avatar} />
          <button className={s.editAvatarButton} onClick={handleAvatarChanged}>
            <Edit />
          </button>
        </div>
      </div>
      {!isEditingName && (
        <div className={s.editName}>
          <div className={s.nameWithEditButton}>
            <Typography className={s.name} variant={'h2'}>
              {name}
            </Typography>
            <button className={s.editNameButton} onClick={handleNameChanged}>
              <Edit />
            </button>
          </div>
          <Typography className={s.email} variant={'body2'}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            {email}
          </Typography>
          <div className={s.buttonContainer}>
            <Button onClick={handleLogout} variant={'secondary'}>
              <LogOut />
              Logout
            </Button>
          </div>
        </div>
      )}
      {isEditingName && (
        <div className={s.saveName}>
          <Input className={s.inputName} label={'Nickname'} variant={'primary'} />
          <Button className={s.saveNameButton} fullWidth onClick={saveNameChanged}>
            Save Changes
          </Button>
        </div>
      )}
    </Card>
  )
}
