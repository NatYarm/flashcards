import { BrowserRouter, Link } from 'react-router-dom'

import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Select } from './components/ui/select/select'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
          <span>Test_Mger</span>
        </Button>
        <Select />
        <Card as={'section'}>Card content</Card>
      </BrowserRouter>
    </div>
  )
}
