import { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import { LogOutOutline } from '@/assets/icons/components'
import { LoginForm } from '@/components/auth/login-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Pagination } from '@/components/ui/pagination'

export function App() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          <LogOutOutline />
          Button
        </Button>
        <br />
        <Card>Card</Card>
        <br />
        <Input />
        <br />
        <Pagination
          currentPage={currentPage}
          itemsPerPage={5}
          onPageChange={page => setCurrentPage(page)}
          totalPageCount={10}
        />
        <br />
        <LoginForm />
      </BrowserRouter>
    </div>
  )
}
