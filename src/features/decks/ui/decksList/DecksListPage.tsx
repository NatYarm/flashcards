import { useState } from 'react'

import { TrashOutline } from '@/assets/icons/components'
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
import {
  useCreateDeckMutation,
  useDecksSearchParams,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} from '@/features/decks/services'

import s from './decksListPage.module.scss'
import DeckDialog from '../../dialogs/deckDialog'

export const DecksListPage = () => {
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false)

  const [createDeck] = useCreateDeckMutation()
  const [updateDeck] = useUpdateDeckMutation()
  const [deleteDeck] = useDeleteDeckMutation()

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
            clearFilters()
            createDeck(data)
          }}
        />
        <Button onClick={openCreateDeckModal}>Add New Deck</Button>
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
      <DecksTable
        decks={decks?.items}
        onSort={setSort}
        sort={sort}
        onEditClick={id => {
          updateDeck({ id })
        }}
        onDeleteClick={id => {
          deleteDeck({ id })
        }}
      />

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
