import { ChangeEvent, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { Edit2Outline, LogOut } from '@/assets/icons/components'
import { Button, Card, ControlledTextField, Typography } from '@/common/components'
import { fileSchema, text } from '@/common/utils'
import { useUpdateMeMutation } from '@/features/auth/api/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { CameraIcon } from '@radix-ui/react-icons'
import { z } from 'zod'

import s from './personalInformation.module.scss'

type Props = {
  email: string
  img?: string
  name: string
}

const loginSchema = z.object({
  avatar: z.union([fileSchema, z.string()]),
  name: text.optional(),
})

export type ProfileFormData = z.infer<typeof loginSchema>

export const PersonalInformation = ({ email, img, name }: Props) => {
  const [updateProfilePage] = useUpdateMeMutation()
  const [isEditingName, setIsEditingName] = useState(false)
  const { control, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      avatar: img || 'https://avatars.githubusercontent.com/u',
      name: name,
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmitProfile = (formData: ProfileFormData) => {
    const avatar = typeof formData.avatar === 'string' ? null : formData.avatar

    updateProfilePage({ ...formData, avatar })
  }

  const navigate = useNavigate()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateProfilePage({ avatar: e.target.files[0] })
    }
  }

  const handleNameChanged = handleSubmit(data => {
    updateProfilePage({ name: data.name })
    setIsEditingName(!isEditingName)
  })

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
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    fileInputRef.current && fileInputRef.current.click()
                  }}
                >
                  <CameraIcon />
                </button>
                <input
                  accept={'image/*'}
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
              <Button
                onClick={e => {
                  e.preventDefault()
                  navigate(-1)
                }}
                variant={'secondary'}
              >
                <LogOut /> Logout
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
