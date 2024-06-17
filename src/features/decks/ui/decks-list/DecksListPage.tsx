import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import { Button } from '@/common/components/button'
import { Loader } from '@/common/components/loader'
import { Modal } from '@/common/components/modal'
import { Page } from '@/common/components/page'
import { Pagination } from '@/common/components/pagination'
import { Slider } from '@/common/components/slider'
import { Tabs } from '@/common/components/tabs'
import { TextField } from '@/common/components/text-field'
import { Typography } from '@/common/components/typography'
import { useGetDecksQuery } from '@/services/flashcardsApi'

import s from './decks-page.module.scss'

import { DecksTable } from './decks-table/DecksTable'

export const DecksListPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentTab, setCurrentTab] = useState('all')
  const [cardsRange, setCardsRange] = useState([0, 35])
  const [createNewDeck, setCreateNewDeck] = useState(false)

  const {
    data: decks,
    error,
    isLoading,
  } = useGetDecksQuery({
    currentPage,
    itemsPerPage,
    maxCardsCount: cardsRange[1],
    minCardsCount: cardsRange[0],
    name: search,
  })

  const tabs = [
    { title: 'My decks', value: 'my' },
    { title: 'All decks', value: 'all' },
    { title: 'Favorites', value: 'favorites' },
  ]

  const maxCardsRange = 35

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
  }

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab)
  }

  const handleSliderCommitted = (value: number[]) => {
    setCardsRange(value)
  }

  const addDeck = () => {
    setCreateNewDeck(true)
  }

  if (isLoading) {
    return <Loader />
  }

  if (error) {
    return <h1>{JSON.stringify(error)}</h1>
  }

  return (
    <Page>
      <div className={s.pageHeader}>
        <Typography as={'h1'} variant={'h1'}>
          Decks List
        </Typography>
        <Modal onOpenChange={setCreateNewDeck} open={createNewDeck} title={'create new deck'}>
          modal
        </Modal>
        <Button onClick={addDeck}>Add New Deck</Button>
      </div>
      <div className={s.filters}>
        <div className={s.searchField}>
          <TextField
            onChange={e => setSearch(e.currentTarget.value)}
            placeholder={'Search'}
            type={'search'}
            value={search}
          />
        </div>

        <Tabs
          label={'Show decks cards'}
          onValueChange={handleTabChange}
          tabs={tabs}
          value={currentTab ?? undefined}
        />

        <Slider
          label={'Number of cards'}
          max={maxCardsRange}
          onValueChange={setCardsRange}
          onValueCommit={handleSliderCommitted}
          value={cardsRange}
        />

        <Button variant={'secondary'}>
          <TrashOutline />
          Clear Filters
        </Button>
      </div>
      <DecksTable decks={decks?.items} />

      <Pagination
        className={s.pagination}
        currentPage={currentPage || 1}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onPerPageChange={handleItemsPerPageChange}
        perPageOptions={[5, 10, 20, 30]}
        totalPageCount={decks?.pagination.totalPages || 1}
      />
    </Page>
  )
}
