import { PersonalInformation, ProfileFormData } from '@/features/auth/profile'

import { useGetMeQuery, useUpdateMeMutation } from '../api/authApi'

export const ProfilePage = () => {
  const { data: meData } = useGetMeQuery()
  const [updateProfilePage] = useUpdateMeMutation()

  const onSubmitProfile = (formData: ProfileFormData) => {
    updateProfilePage(formData)
  }

  return (
    <PersonalInformation
      email={meData?.email || ''}
      img={meData?.avatar}
      name={meData?.name || ''}
      onSubmit={onSubmitProfile}
    />
  )
}

ProfilePage.displayName = 'ProfilePage'
