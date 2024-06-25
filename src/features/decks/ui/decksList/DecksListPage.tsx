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

import { DeckDialog } from '../../dialogs'
import { DecksTable } from './decksTable/DecksTable'

export const DecksListPage = () => {
  const [showCreateDeckModal, setShowCreateDeckModal] = useState(false)

  const [createDeck, { isLoading: creatingDeck }] = useCreateDeckMutation()
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
    maxCardsInDeck,
    minCardsInDeck,
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
          onCancel={() => setShowCreateDeckModal(false)}
          onConfirm={data => {
            clearFilters()
            createDeck(data)
          }}
          onOpenChange={setShowCreateDeckModal}
          open={showCreateDeckModal}
          title={'Add New Deck'}
        />
        <Button disabled={creatingDeck} onClick={openCreateDeckModal}>
          Add New Deck
        </Button>
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
          max={maxCardsInDeck}
          min={minCardsInDeck}
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
        onDeleteClick={id => {
          deleteDeck({ id })
        }}
        onEditClick={id => {
          updateDeck({ id })
        }}
        onSort={setSort}
        sort={sort}
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
