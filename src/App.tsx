import { BrowserRouter, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
        </Button>
        <br />
        <Select />
        <br />
        <Typography variant={'h1'}>H1</Typography>
      </BrowserRouter>
    </div>
  )
}
