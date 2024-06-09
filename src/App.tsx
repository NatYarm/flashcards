import { BrowserRouter } from 'react-router-dom'

import { SignIn } from '@/components/auth/sign-in'

export function App() {
  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    </div>
  )
}
