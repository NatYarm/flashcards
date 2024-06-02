import { BrowserRouter, Link } from 'react-router-dom'

import s from './app.module.scss'

import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Label } from './components/ui/label/label'
import { Select } from './components/ui/select'
import { SelectItem } from './components/ui/select/selectItem'

export function App() {
  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
          <span>Test_Mger</span>
        </Button>
        <Label>Select-box</Label>
        <Select className={s.selectStyle} placeholder={'select-box'}>
          <SelectItem value={'apple'}>Apple</SelectItem>
          <SelectItem value={'banana'}>Banana</SelectItem>
          <SelectItem value={'grapes'}>Grapes</SelectItem>
        </Select>
        <Card>Card</Card>
      </BrowserRouter>
    </div>
  )
}
