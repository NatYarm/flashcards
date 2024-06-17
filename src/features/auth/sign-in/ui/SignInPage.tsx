import { Page } from '@/common/components/page'

import { SignIn } from './SignIn'

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <Page>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
