import { Page } from '@/common/components/page'
<<<<<<< HEAD:src/features/auth/sign-in/ui/SignInPage.tsx

import { SignIn } from './SignIn'
=======
import { SignInForm } from './SignInForm'
>>>>>>> 7fd046f0892a52b696eecbaaef6abb1a1e08acc5:src/features/auth/signIn/SignInPage.tsx

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <Page>
      <SignInForm onSubmit={handleSignIn} />
    </Page>
  )
}
