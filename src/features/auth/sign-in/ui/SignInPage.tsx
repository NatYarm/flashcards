<<<<<<< HEAD:src/pages/sign-in-page/sign-in-page.tsx
import { SignIn } from '@/components/auth/sign-in'
import { Page } from '@/components/ui/page/page'
=======
import { Page } from '@/common/components/page'
import { SignIn } from './SignIn'
>>>>>>> cf651addbcebbe2c1c79869b5831b0fccc8ba67d:src/features/auth/sign-in/ui/SignInPage.tsx

export const SignInPage = () => {
  const handleSignIn = () => {}

  return (
    <Page>
      <SignIn onSubmit={handleSignIn} />
    </Page>
  )
}
