import { Page } from '@/common/components/page/Page'
import { RecoveryPassword } from './RecoverPassword'

export const RecoveryPasswordPage = () => {
  const handleRecoveryPassword = () => {}

  return (
    <Page>
      <RecoveryPassword onSubmit={handleRecoveryPassword} />
    </Page>
  )
}
