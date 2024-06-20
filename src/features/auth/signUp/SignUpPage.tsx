import { Page } from '@/common/components/page/Page'
import { SignUpForm } from './SignUpForm'

export const SignUpPage = () => {
  const handleSignUp = () => {}

  return (
    <Page>
      <SignUpForm onSubmit={handleSignUp} />
    </Page>
  )
}
