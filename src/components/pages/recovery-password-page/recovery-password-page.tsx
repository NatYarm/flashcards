import { RecoveryPassword } from '@/components/auth/recovery-password'
import { Page } from '@/components/ui/page/page'

export const RecoveryPasswordPage = () => {
  const handleRecoveryPassword = () => {}

  return (
    <Page>
      <RecoveryPassword onSubmit={handleRecoveryPassword} />
    </Page>
  )
}
