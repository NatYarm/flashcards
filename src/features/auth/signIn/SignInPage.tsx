import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loader, Page } from '@/common/components'
import { path } from '@/common/enums'
import { LoginError } from '@/common/types'
import { useGetMeQuery, useSignInMutation } from '@/features/auth/api/authApi'

import { SignIn, SignInForm } from './SignInForm'

export const SignInPage = () => {
  const [signIn, signInResult] = useSignInMutation()
  const { isLoading, isSuccess } = useGetMeQuery()
  const navigate = useNavigate()

  const handleSignIn = (data: SignIn) => {
    signIn(data).unwrap()
  }

  useEffect(() => {
    if (signInResult.error) {
      toast.error((signInResult.error as LoginError).data.message ?? 'You are not logged in')
    }
    if (signInResult.isSuccess || isSuccess) {
      navigate(path.base)
    }
  }, [signInResult.error, signInResult.isSuccess, isSuccess, navigate])

  if (signInResult.isLoading || isLoading) {
    return <Loader />
  }

  return (
    <Page>
      <SignInForm onSubmit={handleSignIn} />
    </Page>
  )
}
