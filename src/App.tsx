import { useState } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { Pagination } from './components/ui/pagination'
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
          Hello
        </Button>

        <Card>Card</Card>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
          perPageOptions={perPageOptions}
          totalPageCount={10}
        />
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
    </div>
  )
}
