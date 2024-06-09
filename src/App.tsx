import { BrowserRouter } from 'react-router-dom'

import { SignUp } from '@/components/auth/sign-up'

export function App() {
  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        {/*<SignIn />*/}
        <SignUp />
      </BrowserRouter>
    </div>
  )
}
