import { Page } from '@/common/components/page/Page'
import { RecoverPassword } from './RecoverPassword'

export const RecoveryPasswordPage = () => {
  const handleRecoveryPassword = () => {}

  return (
    <Page>
      <RecoverPassword onSubmit={handleRecoveryPassword} />
    </Page>
  )
}
