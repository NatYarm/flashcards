import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loader } from '@/common/components'
import { Page } from '@/common/components/page'
import { path } from '@/common/enams'
import { LoginError } from '@/common/types'
import { useGetMeQuery, useSignInMutation } from '@/features/auth/api/authApi'

import { SignIn, SignInForm } from './SignInForm'

export const SignInPage = () => {
  const [signIn, signInResult] = useSignInMutation()
  const { isLoading, isSuccess } = useGetMeQuery()
  const navigate = useNavigate()
  const handleSignIn = (formData: SignIn) => {
    signIn(formData).unwrap()
  }

  if (signInResult.isLoading || isLoading) {
    return <Loader />
  }

  if (signInResult.error) {
    toast.error((signInResult.error as LoginError).data.message ?? 'You are not login')
  }
  if (signInResult.isSuccess) {
    navigate(path.base)
  }
  if (isSuccess) {
    navigate(path.base)
  }

  return (
    <Page>
      <SignInForm onSubmit={handleSignIn} />
    </Page>
  )
}
