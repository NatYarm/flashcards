import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Edit2, LogOut } from '@/assets/icons'
import { Button, Card, InputType, Typography, UserAvatar } from '@/common/components'
import { ControlledInput } from '@/common/components/controlled'
import { ControlledInputFile } from '@/common/components/controlled/controlledInputFile/ControlledInputFile'
import { schemaFile, text } from '@/common/utils/zodSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './personalInformatuin.module.scss'

export type Props = {
  email: string
  imgSrc?: string
  name: string
  onSubmit: (data: ProfileFormData) => void
}

const profileSchema = z.object({
  avatar: z.union([schemaFile, z.string()]),
  name: text.optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export const PersonalInformation = ({ email, imgSrc, name, onSubmit }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const { control, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      avatar: imgSrc || `https://ui-avatars.com/api/?name=${name}`,
      name: name,
    },
    resolver: zodResolver(profileSchema),
  })
  const formId = useId()
  const navigate = useNavigate()

  const nickNameHandler = (data: ProfileFormData) => {
    onSubmit(data)
    setIsEdit(!isEdit)
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.classTitle} variant={'h1'}>
        Personal Information
      </Typography>
      <form id={formId} onSubmit={handleSubmit(nickNameHandler)}>
        {!isEdit ? (
          <div className={s.infoBlock}>
            <div className={s.userAvatar}>
              <UserAvatar name={name} src={imgSrc} />
            </div>
            <div className={s.nameBlock}>
              <Typography as={'h2'} variant={'h1'}>
                {name}
              </Typography>
              <Typography
                as={'button'}
                className={s.edit}
                onClick={() => setIsEdit(!isEdit)}
                variant={'h4'}
              >
                <Edit2 />
              </Typography>
            </div>
            <Typography as={'span'} className={s.email} variant={'body1'}>
              {email}
            </Typography>
            <Button
              fullWidth
              onClick={e => {
                e.preventDefault()
                navigate(-1)
              }}
              variant={'secondary'}
            >
              <LogOut /> Back
            </Button>
          </div>
        ) : (
          <div className={s.settingBlock}>
            <Typography as={'span'} className={s.email} variant={'body1'}>
              avatar
            </Typography>
            <div className={s.changeAvatar}>
              <ControlledInputFile
                control={control}
                // defaultDeckImage={imgSrc || ''}
                name={'avatar'}
              />
            </div>

            <ControlledInput
              autoFocus
              className={s.input}
              control={control}
              defaultValue={name}
              label={'NickName'}
              name={'name'}
              type={InputType.text}
            />
            <Button className={s.saveButton} fullWidth>
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}

PersonalInformation.displayName = 'PersonalInformation'

/*
import { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Edit2Outline, LogOutOutline } from '@/assets/icons/components'
import { Button, Card, ControlledTextField, Typography } from '@/common/components'
import { fileSchema, text } from '@/common/utils'
import { useLogOutMutation, useUpdateMeMutation } from '@/features/auth/api/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { CameraIcon } from '@radix-ui/react-icons'
import { z } from 'zod'

import s from './personalInformation.module.scss'

type Props = {
  email: string
  img?: string
  name: string
}

const profileSchema = z.object({
  avatar: z.union([fileSchema, z.string()]),
  name: text.optional(),
})

export type ProfileFormData = z.infer<typeof profileSchema>

export const PersonalInformation = ({ email, img, name }: Props) => {
  const [updateProfilePage] = useUpdateMeMutation()
  const [LogOut] = useLogOutMutation()
  const [isEditingName, setIsEditingName] = useState(false)
  const { control, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      avatar: img || 'https://avatars.githubusercontent.com/u',
      name: name,
    },
    resolver: zodResolver(profileSchema),
  })

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onSubmitProfile = (formData: ProfileFormData) => {
    const avatar = typeof formData.avatar === 'string' ? null : formData.avatar

    updateProfilePage({ ...formData, avatar })
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await updateProfilePage({ avatar: e.target.files[0] })
    }
  }

  const handleNameChanged = handleSubmit(async data => {
    await updateProfilePage({ name: data.name })
    setIsEditingName(!isEditingName)
  })

  const handleEditAvatarClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    fileInputRef.current?.click()
  }

  const handleLogoutClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      await LogOut().unwrap()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Personal Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmitProfile)}>
        {!isEditingName ? (
          <div>
            <div className={s.photoContainer}>
              <div>
                <img alt={'avatar'} src={img} />
                <button
                  className={s.editAvatarButton}
                  onClick={handleEditAvatarClick}
                  type={'button'}
                >
                  <CameraIcon />
                </button>
                <input
                  accept={'image/!*'}
                  className={s.file}
                  onChange={handleChangeFile}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  type={'file'}
                />
              </div>
            </div>
            <div className={s.nameWithEditButton}>
              <Typography as={'h2'} className={s.name} variant={'h2'}>
                {name}
              </Typography>
              <button
                className={s.editNameButton}
                onClick={() => setIsEditingName(true)}
                type={'button'}
              >
                <Edit2Outline />
              </button>
            </div>
            <Typography className={s.email} variant={'body2'}>
              {email}
            </Typography>
            <div className={s.buttonContainer}>
              <Button onClick={handleLogoutClick} type={'button'} variant={'secondary'}>
                <LogOutOutline /> Logout
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className={s.photoContainer}>
              <div>
                <img alt={'avatar'} src={img} />
              </div>
            </div>
            <ControlledTextField
              autoComplete={'off'}
              autoFocus
              className={s.inputName}
              control={control}
              label={'NickName'}
              name={'name'}
              type={'text'}
            />
            <Button className={s.saveButton} fullWidth onClick={handleNameChanged}>
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </Card>
  )
}
*/
