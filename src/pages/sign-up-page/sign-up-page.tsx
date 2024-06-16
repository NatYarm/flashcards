import { SignUp } from "@/components/auth/sign-up";
import { Page } from "@/components/ui/page/page";

export const SignUpPage = () => {
  const handleSignUp = () => {}

  return (
    <Page>
      <SignUp onSubmit={handleSignUp} />
    </Page>
  )
}
