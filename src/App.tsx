import { BrowserRouter, Link } from 'react-router-dom'

<<<<<<< HEAD
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
=======
import s from './app.module.scss'

import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Label } from './components/ui/label/label'
import { Select } from './components/ui/select'
import { SelectItem } from './components/ui/select/selectItem'
>>>>>>> 37d4cfb1c08411463195afd61ce5a962862991e3

export function App() {
  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
          <span>Test_Mger</span>
        </Button>
<<<<<<< HEAD

        <Typography variant={'h1'}>H1</Typography>
=======
        <Label>Select-box</Label>
        <Select className={s.selectStyle} placeholder={'select-box'}>
          <SelectItem value={'apple'}>Apple</SelectItem>
          <SelectItem value={'banana'}>Banana</SelectItem>
          <SelectItem value={'grapes'}>Grapes</SelectItem>
        </Select>
        <Card>Card</Card>
>>>>>>> 37d4cfb1c08411463195afd61ce5a962862991e3
      </BrowserRouter>
    </div>
  )
}
