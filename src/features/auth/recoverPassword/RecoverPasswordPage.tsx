import { useState } from 'react'
import { toast } from 'react-toastify'

import { Page } from '@/common/components'
import { useRecoveryPasswordMutation } from '@/features/auth/api/authApi'

import { RecoverPassword } from './RecoverPassword'

export const RecoveryPasswordPage = () => {
  const [recoveryPassword, { isLoading }] = useRecoveryPasswordMutation()
  const [message, setMessage] = useState<null | string>(null)
  const [error, setError] = useState<null | string>(null)

  const handleRecoveryPassword = async (data: { email: string }) => {
    try {
      await recoveryPassword(data).unwrap()

      setMessage('Instructions have been sent to your email.')
      setError(null)
      toast.success('Instructions have been sent to your email.')
    } catch (err) {
      setError('Failed to send recovery instructions. Please try again.')
      setMessage(null)
      toast.error('Failed to send recovery instructions. Please try again.')
    }
  }

  return (
    <Page>
      {message && <div className={'success-message'}>{message}</div>}
      {error && <div className={'error-message'}>{error}</div>}
      <RecoverPassword isLoading={isLoading} onSubmit={handleRecoveryPassword} />
    </Page>
  )
}
