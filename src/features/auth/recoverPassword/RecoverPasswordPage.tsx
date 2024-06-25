import { Page } from '@/common/components'

import { RecoverPassword } from './RecoverPassword'

export const RecoveryPasswordPage = () => {
  const handleRecoveryPassword = () => {}

  return (
    <Page>
      <RecoverPassword onSubmit={handleRecoveryPassword} />
    </Page>
  )
}
