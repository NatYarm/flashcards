import { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Pagination } from './components/ui/pagination'

export function App() {
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <div style={{ margin: 'auto', maxWidth: '1000px' }}>
      <BrowserRouter>
        <Button as={Link} to={'https://google.com'}>
          Hello
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
