import { useState } from 'react'
import { TrashOutline } from '@/assets/icons/components'

import { DecksTable } from './decksTable/DecksTable'
import {
  Button,
  Loader,
  Page,
  Pagination,
  Slider,
  Tabs,
  TextField,
  Typography,
} from '@/common/components'
import { useCreateDeckMutation, useDecksSearchParams } from '@/features/decks/services'

import s from './decksListPage.module.scss'
import DeckDialog from '../../dialogs/deckDialog'

export const DecksListPage = () => {
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false)

  const [createDeck] = useCreateDeckMutation()

  const {
    clearFilters,
    currentPage,
    currentTab,
    decks,
    decksError,
    handlePageChange,
    handleSearchChange,
    handleClearInput,
    itemsPerPage,
    searchParams,
    decksLoading,
    maxCardsCount,
    minCardsCount,
    cardsRange,
    handleSliderValueChange,
    handleItemsPerPageChange,
    handleTabChange,
    setSort,
    sort,
    tabs,
  } = useDecksSearchParams()

  const openCreateDeckModal = () => {
    setShowCreateDeckModal(true)
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

        <DeckDialog
          open={showCreateDeckModal}
          title="Add New Deck"
          onOpenChange={setShowCreateDeckModal}
          onCancel={() => setShowCreateDeckModal(false)}
          onConfirm={data => {
            createDeck(data)
          }}
        />
        <Button onClick={openCreateDeckModal}>Add New Deck</Button>
      </div>
      <div className={s.filters}>
        <div className={s.searchField}>
          <TextField
            placeholder={'Search'}
            type={'search'}
            value={searchParams.get('name') || ''}
            onChange={e => handleSearchChange(e.currentTarget.value)}
            onClearInput={handleClearInput}
          />
        </div>

        <Tabs
          label={'Show decks cards'}
          tabs={tabs}
          value={currentTab || 'all'}
          onValueChange={handleTabChange}
        />

        <Slider
          label={'Number of cards'}
          value={cardsRange}
          min={minCardsCount}
          max={maxCardsCount}
          onValueChange={handleSliderValueChange}
        />

        <Button variant={'secondary'} onClick={clearFilters}>
          <TrashOutline />
          Clear Filters
        </Button>
      </div>
      <DecksTable decks={decks?.items} onSort={setSort} sort={sort} />

      <Pagination
        currentPage={currentPage || 1}
        totalPageCount={decks?.pagination?.totalPages || 1}
        onPageChange={handlePageChange}
        className={s.pagination}
        itemsPerPage={itemsPerPage}
        onPerPageChange={handleItemsPerPageChange}
        perPageOptions={[5, 10, 20, 30]}
      />
    </Page>
  )
}
