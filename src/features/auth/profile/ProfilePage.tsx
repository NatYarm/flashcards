import { Page } from '@/common/components'
import { PersonalInformation, ProfileFormData } from '@/features/auth/profile'

import { useGetMeQuery, useUpdateMeMutation } from '../api/authApi'

export const ProfilePage = () => {
  const { data } = useGetMeQuery()
  const [updateProfilePage] = useUpdateMeMutation()

  const onSubmitProfile = (formData: ProfileFormData) => {
    const avatar = typeof formData.avatar === 'string' ? null : formData.avatar

    updateProfilePage({ ...formData, avatar })
  }

  return (
    <Page>
      <PersonalInformation
        email={data?.email || ''}
        img={data?.avatar || ''}
        name={data?.name || ''}
        onSubmit={onSubmitProfile}
      />
    </Page>
  )
}

ProfilePage.displayName = 'ProfilePage'
