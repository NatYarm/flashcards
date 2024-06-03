import { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import s from './app.module.scss'

import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Pagination } from './components/ui/pagination'
import { Select } from './components/ui/select'
import { SelectItem } from './components/ui/select/selectItem'

export function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
          <span>Test_Mger</span>
        </Button>

        <Card>Card</Card>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={5}
          onPageChange={page => setCurrentPage(page)}
          totalPageCount={10}
        />
      </BrowserRouter>
    </div>
  )
}
