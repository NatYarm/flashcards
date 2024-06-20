import { Page } from '@/common/components/page'

import { SignInForm } from './SignInForm'

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <Page>
      <SignInForm onSubmit={handleSignIn} />
    </Page>
  )
}
