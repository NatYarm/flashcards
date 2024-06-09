import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign-in'
import { SignUp } from '@/components/auth/sign-up'

export function App() {
  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Navigate to={'/sign-in'} />} path={'/'} />
          <Route element={<SignIn />} path={'/sign-in'} />
          <Route element={<SignUp />} path={'/sign-up'} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
