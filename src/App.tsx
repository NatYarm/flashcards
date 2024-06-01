import { LogOut } from '@/assets/icons/components'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Typography } from '@/components/ui/typography'

export function App() {
  return (
    <div>
      <Button>
        <LogOut />
        Button primary
      </Button>
      <p></p>
      <Checkbox label={'Check-box'} />
      <p></p>
      <Typography variant={'h1'}>H1</Typography>
    </div>
  )
}
