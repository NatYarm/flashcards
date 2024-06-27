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
  useDecksSearchParams,
  useDeleteDeckMutation,
  useUpdateDeckMutation,
} from '@/features/decks/services'

import s from './decksListPage.module.scss'

import { useGetMeQuery } from '../../../auth/api/authApi'
import { DeckDialog } from '../../dialogs/DeckDialog'
import { useCreateNewDeck } from '../../dialogs/hooks/useCreateNewDeck'
import { DecksTable } from './decksTable/DecksTable'

export const DecksListPage = () => {
  const { data: me } = useGetMeQuery()
  const currentUserId = me?.id

  const { creatingDeck, handleCreateDeck, setShowCreateModal, showCreateModal } = useCreateNewDeck()

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
    setShowCreateModal(true)
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
        <Button disabled={creatingDeck} onClick={openCreateDeckModal}>
          Add New Deck
        </Button>
        <DeckDialog
          onCancel={() => setShowCreateModal(false)}
          onConfirm={handleCreateDeck}
          onOpenChange={setShowCreateModal}
          open={showCreateModal}
        />
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
        currentUserId={currentUserId ?? ''}
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
