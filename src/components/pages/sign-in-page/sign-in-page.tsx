import { SignIn } from '../../auth/sign-in'
import { Page } from '../../ui/page/page'

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <Page>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
