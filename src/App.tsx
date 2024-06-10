import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { CheckEmail } from '@/components/auth/check-email'
import { RecoveryPassword } from '@/components/auth/recovery-password'
import { SignIn } from '@/components/auth/sign-in'
import { SignUp } from '@/components/auth/sign-up'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navigate to={'/sign-in'} />} path={'/'} />
        <Route element={<SignIn />} path={'/sign-in'} />
        <Route element={<SignUp />} path={'/sign-up'} />
        <Route element={<RecoveryPassword />} path={'/recovery-password'} />
      </Routes>
      <CheckEmail />
    </BrowserRouter>
  )
}
