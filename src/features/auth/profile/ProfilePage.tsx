import { PersonalInformation, ProfileFormData } from '@/features/auth'

import { useGetMeQuery, useUpdateMeMutation } from '../api/authApi'

export const Profile = () => {
  const { data: meData } = useGetMeQuery()
  const [updateProfile] = useUpdateMeMutation()

  const onSubmitProfile = (formData: ProfileFormData) => {
    updateProfile(formData)
  }

  return (
    <PersonalInformation
      email={meData?.email || ''}
      imgSrc={meData?.avatar}
      name={meData?.name || ''}
      onSubmit={onSubmitProfile}
    />
  )
}

Profile.displayName = 'Profile'

/*
import { Page } from '@/common/components'
import { PersonalInformation } from '@/features/auth/profile'

import { useGetMeQuery } from '../api/authApi'

export const ProfilePage = () => {
  const { data } = useGetMeQuery()

  return (
    <Page>
      <PersonalInformation
        email={data?.email || ''}
        img={data?.avatar || ''}
        name={data?.name || ''}
      />
    </Page>
  )
}

ProfilePage.displayName = 'ProfilePage'
*/
