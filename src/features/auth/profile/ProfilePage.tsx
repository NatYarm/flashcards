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
