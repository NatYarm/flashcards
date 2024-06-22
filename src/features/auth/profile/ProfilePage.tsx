import { Page } from '@/common/components'
import { PersonalInformation, ProfileFormData } from '@/features/auth/profile'

import { useGetMeQuery, useUpdateMeMutation } from '../api/authApi'

export const ProfilePage = () => {
  const { data: meData } = useGetMeQuery()
  const [updateProfilePage] = useUpdateMeMutation()

  const onSubmitProfile = (formData: ProfileFormData) => {
    /*updateProfilePage(formData)*/
    const avatar = typeof formData.avatar === 'string' ? null : formData.avatar

    updateProfilePage({ ...formData, avatar })
  }

  return (
    <Page>
      <PersonalInformation
        email={meData?.email || ''}
        img={meData?.avatar || ''}
        name={meData?.name || ''}
        onSubmit={onSubmitProfile}
      />
    </Page>
  )
}

ProfilePage.displayName = 'ProfilePage'
