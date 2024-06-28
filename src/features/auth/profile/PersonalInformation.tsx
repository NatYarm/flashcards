import { useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Edit from '@/assets/icons/components/Edit'
import LogOut from '@/assets/icons/components/LogOut'
import { Avatar, ControlledTextField } from '@/common/components'
import { Button } from '@/common/components/button'
import { Card } from '@/common/components/card'
import { ControlledInputFile } from '@/common/components/controlled/controlledInputFile/controlledInputFile'
import { Typography } from '@/common/components/typography'
import { fileSchema, text } from '@/common/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import s from './personalInformation.module.scss'

export type Props = {
  email: string
  img: string
  name: string
  onSubmit: (data: ProfileFormData) => void
}

const loginSchema = z.object({
  avatar: z.union([fileSchema, z.string()]),
  name: text.optional(),
})

export type ProfileFormData = z.infer<typeof loginSchema>

export const PersonalInformation = ({ email, img, name, onSubmit }: Props) => {
  const [isEditingName, setIsEditingName] = useState(false)
  const { control, handleSubmit } = useForm<ProfileFormData>({
    defaultValues: {
      avatar: img || `https://ui-avatars.com/api/?name=${name}`,
      name: name,
    },
    resolver: zodResolver(loginSchema),
  })
  const formId = useId()
  const navigate = useNavigate()

  const nickNameHandler = (data: ProfileFormData) => {
    onSubmit(data)
    setIsEditingName(!isEditingName)
  }

  return (
    <Card className={s.card}>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Personal Information
      </Typography>
      <form id={formId} onSubmit={handleSubmit(nickNameHandler)}>
        {!isEditingName ? (
          <div className={s.infoBlock}>
            <div className={s.userAvatar}>
              <Avatar name={name} src={img} />
            </div>
            <div className={s.nameBlock}>
              <Typography as={'h2'} variant={'h2'}>
                {name}
              </Typography>
              <Typography
                as={'button'}
                className={s.editAvatarButton}
                onClick={() => setIsEditingName(!isEditingName)}
                variant={'h4'}
              >
                <Edit />
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
              <ControlledInputFile control={control} name={'avatar'} />
            </div>

            <ControlledTextField
              autoFocus
              className={s.input}
              control={control}
              defaultValue={name}
              label={'NickName'}
              name={'name'}
              type={'text'}
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
