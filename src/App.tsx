import { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import { LoginForm } from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'

import {
  LogOut,
  MoreHorizontal,
  MoreVerticalOutline,
  PersonOutline,
} from './assets/icons/components'
import { DropdownMenu, DropdownSeparator } from './components/ui/dropdown'
import { DropdownMenuItem } from './components/ui/dropdown/dropdownMenuItem'
import { Tabs } from './components/ui/tabs'
export function App() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const perPageOptions = [5, 10, 20, 30, 50]

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  const handlePerPageChange = (count: number) => {
    setItemsPerPage(count)
  }

  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Button
        </Button>
        <br />
        <br />
        <Card>Card</Card>
        <br />
        <Input type={'password'} />
        <br />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPageOptions={perPageOptions}
          totalPageCount={10}
        />
        <br />
        <LoginForm />
      </BrowserRouter>

      <Tabs
        defaultValue={'tab1'}
        label={'title'}
        orientation={'vertical'}
        tabs={[
          { title: 'Switcher', value: 'tab1' },
          { title: 'Switcher', value: 'tab2' },
          { disabled: true, title: 'Switcher', value: 'tab3' },
        ]}
      />
      <br />
      <DropdownMenu trigger={<MoreVerticalOutline />}>
        <DropdownMenuItem>
          <PersonOutline /> Profile
        </DropdownMenuItem>
        <DropdownSeparator />
        <DropdownMenuItem>
          <LogOut /> Logout
        </DropdownMenuItem>
        <DropdownSeparator />
      </DropdownMenu>
    </div>
  )
}
