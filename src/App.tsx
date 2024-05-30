import { BrowserRouter, Link } from 'react-router-dom'

import { Button } from './components/ui/button'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
          <span>Test_Mger</span>
        </Button>
      </BrowserRouter>
    </div>
  )
}
