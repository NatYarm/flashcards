import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loader, Page } from '@/common/components'
import { path } from '@/common/enums'
import { LoginError } from '@/common/types'
import { useGetMeQuery, useSignInMutation } from '@/features/auth/api/authApi'

import { SignIn, SignInForm } from './SignInForm'

export const SignInPage = () => {
  const [signIn, { error: signInError, isLoading: signInLoading, isSuccess: signInSuccess }] =
    useSignInMutation()
  const { isLoading: meLoading, isSuccess: meSuccess } = useGetMeQuery()
  const navigate = useNavigate()

  const handleSignIn = (data: SignIn) => {
    signIn(data).unwrap()
  }

  useEffect(() => {
    if (signInLoading || meLoading) {
      return
    }

    if (signInError) {
      toast.error((signInError as LoginError).data.message ?? 'You are not logged in')
    }

    if (signInSuccess || meSuccess) {
      navigate(path.base)
    }
  }, [signInLoading, meLoading, signInSuccess, meSuccess, signInError, navigate])

  if (signInLoading || meLoading) {
    return <Loader />
  }

  return (
    <Page>
      <SignInForm onSubmit={handleSignIn} />
    </Page>
  )
}
