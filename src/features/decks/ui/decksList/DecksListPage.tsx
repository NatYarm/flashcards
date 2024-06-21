import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
import {
  Button,
  Loader,
  Modal,
  Page,
  Pagination,
  Slider,
  Tabs,
  TextField,
  Typography,
} from '@/common/components'
import { useDecksSearchParams } from '@/features/decks/services/useDecksSearchParams'

import s from './decksListPage.module.scss'

import { DecksTable } from './decksTable/DecksTable'

export const DecksListPage = () => {
  const [createNewDeck, setCreateNewDeck] = useState(false)

  const {
    cardsRange,
    clearFilters,
    currentPage,
    currentTab,
    decks,
    decksError,
    decksLoading,
    handleClearInput,
    handleItemsPerPageChange,
    handlePageChange,
    handleSearchChange,
    handleSliderValueChange,
    handleTabChange,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    searchParams,
    setSort,
    sort,
    tabs,
  } = useDecksSearchParams()

  const addDeck = () => {
    setCreateNewDeck(true)
  }

  if (decksLoading) {
    return <Loader />
  }

  if (decksError) {
    return (
      <div className={s.error}>
        {decksError?.map(e => <p key={e.field}>{`error: " ${e.message} "at" ${e.field} "`}</p>)}
      </div>
    )
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
            onChange={e => handleSearchChange(e.currentTarget.value)}
            onClearInput={handleClearInput}
            placeholder={'Search'}
            type={'search'}
            value={searchParams.get('name') || ''}
          />
        </div>

        <Tabs
          label={'Show decks cards'}
          onValueChange={handleTabChange}
          tabs={tabs}
          value={currentTab || 'all'}
        />

        <Slider
          label={'Number of cards'}
          max={maxCardsCount}
          min={minCardsCount}
          onValueChange={handleSliderValueChange}
          value={cardsRange}
        />

        <Button onClick={clearFilters} variant={'secondary'}>
          <TrashOutline />
          Clear Filters
        </Button>
      </div>
      <DecksTable decks={decks?.items} onSort={setSort} sort={sort} />

      <Pagination
        className={s.pagination}
        currentPage={currentPage || 1}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onPerPageChange={handleItemsPerPageChange}
        perPageOptions={[5, 10, 20, 30]}
        totalPageCount={decks?.pagination?.totalPages || 1}
      />
    </Page>
  )
}
