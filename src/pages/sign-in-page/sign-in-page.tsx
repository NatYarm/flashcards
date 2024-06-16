import { SignIn } from '@/components/auth/sign-in'
import { Page } from '@/components/ui/page/page'

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <Page>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
