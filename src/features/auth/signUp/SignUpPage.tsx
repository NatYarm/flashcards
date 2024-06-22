import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Loader, Page } from '@/common/components'
import { path } from '@/common/enams'
import { SignErrorResponse, SignUpArgs } from '@/common/types'
import { useSignUpMutation } from '@/features/auth/api/authApi'
import { emailTemplateConfirmEmail } from '@/features/auth/signUp/emailTemplateConfirmEmail'

import { SignUp, SignUpForm } from './SignUpForm'

export const SignUpPage = () => {
  const [signUp, { error, isError, isLoading, isSuccess }] = useSignUpMutation()
  const navigate = useNavigate()

  const handleSignUp = (data: SignUp) => {
    const registrationData: SignUpArgs = {
      email: data.email,
      html: emailTemplateConfirmEmail,
      password: data.password,
      sendConfirmationEmail: true,
    }

    signUp(registrationData)
  }

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (isError && error) {
      const err = error as SignErrorResponse
      const errorMessage = err.data.errorMessages.join(' ') || 'Registration failed'

      toast.error(errorMessage)
    }

    if (isSuccess) {
      toast.success('Registration completed successfully. Check your email')
      navigate(path.signIn)
    }
  }, [isLoading, isError, isSuccess, error, navigate])

  if (isLoading) {
    return <Loader />
  }

  return (
    <Page>
      <SignUpForm onSubmit={handleSignUp} />
    </Page>
  )
}
