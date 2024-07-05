import { toast } from 'react-toastify'

import { Page } from '@/common/components'
import { useRecoveryPasswordMutation } from '@/features/auth/api/authApi'

import { RecoverPassword } from './RecoverPassword'

export const RecoveryPasswordPage = () => {
  const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation()

  const handleRecoveryPassword = async (email: string) => {
    try {
      await recoveryPassword({ email }).unwrap()
      toast.success('Instructions have been sent to your email.')
    } catch (error) {
      toast.error('Failed to send recovery instructions. Please try again.')
    }
  }

  return (
    <Page>
      <RecoverPassword isLoading={isLoading} onSubmit={handleRecoveryPassword} />
    </Page>
  )
}
