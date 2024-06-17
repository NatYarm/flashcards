import { Page } from '@/common/components/page/Page'
import { SignUp } from './SignUp'

export const SignUpPage = () => {
  const handleSignUp = () => {}

  return (
    <Page>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
