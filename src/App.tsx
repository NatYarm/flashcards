import { BrowserRouter, Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label/label'
import { Pagination } from '@/components/ui/pagination'
import { Select } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Typography } from '@/components/ui/typography'

export function App() {
  return (
    <div>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
        </Button>
        <br />
        <Card />
        <br />
        <Checkbox />
        <br />
        <Label />
        <br />
        <Pagination />
        <br />
        <Select />
        <br />
        <Typography variant={'h1'}>H1</Typography>
        <br />
        <Slider value={[5, 55]} />
      </BrowserRouter>
    </div>
  )
}
