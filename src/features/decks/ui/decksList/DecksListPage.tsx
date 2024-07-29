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
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useDecksSearchParams } from '@/features/decks/services'

import s from './decksListPage.module.scss'

import { DeckModal, DeleteDeckModal } from '../../modals'
import { useCreateNewDeck, useDeleteDeck, useUpdateDeck } from '../../modals/hooks'
import { DecksTable } from './decksTable/DecksTable'

export const DecksListPage = () => {
  const { data: me } = useGetMeQuery()
  const currentUserId = me?.id

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

  const {
    handleCreateDeck,
    isLoadingCreateDeck,
    onCancelCreateDeck,
    setShowCreateModal,
    showCreateModal,
  } = useCreateNewDeck(clearFilters)

  const {
    deckToEdit,
    handleDeckUpdate,
    isEditModalOpen,
    onCancelUpdateDeck,
    onEditClick,
    setIsEditModalOpen,
  } = useUpdateDeck(clearFilters)

  const {
    deckName,
    deckToDeleteId,
    handleDeckDelete,
    isDeleteModalOpen,
    isLoadingDeleteDeck,
    onCancelDelete,
    onDeleteClick,
    setIsDeleteModalOpen,
  } = useDeleteDeck()

  const openCreateDeckModal = () => {
    setShowCreateModal(true)
  }

  if (decksLoading || isLoadingDeleteDeck || isLoadingCreateDeck) {
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
      {deckToEdit && (
        <DeckModal
          confirmText={'Update deck'}
          defaultValues={{
            cover: deckToEdit.cover,
            isPrivate: deckToEdit.isPrivate,
            name: deckToEdit.name,
          }}
          onCancel={onCancelUpdateDeck}
          onConfirm={handleDeckUpdate}
          onOpenChange={setIsEditModalOpen}
          open={isEditModalOpen}
          title={'Update Deck'}
        />
      )}
      {deckToDeleteId && (
        <DeleteDeckModal
          deckName={deckName ?? 'Selected deck'}
          onCancel={onCancelDelete}
          onConfirm={handleDeckDelete}
          onOpenChange={setIsDeleteModalOpen}
          open={isDeleteModalOpen}
        />
      )}
      <div className={s.pageHeader}>
        <Typography as={'h1'} variant={'h1'}>
          Decks List
        </Typography>
        <Button disabled={isLoadingCreateDeck} onClick={openCreateDeckModal}>
          Add New Deck
        </Button>
        <DeckModal
          confirmText={'Save Deck'}
          onCancel={onCancelCreateDeck}
          onConfirm={handleCreateDeck}
          onOpenChange={setShowCreateModal}
          open={showCreateModal}
        />
      </div>
      <div className={s.filters}>
        <div className={s.searchField}>
          <TextField
            onClearInput={handleClearInput}
            onValueChange={handleSearchChange}
            /*onChange={e => handleSearchChange(e.currentTarget.value)}*/
            placeholder={'Search'}
            type={'search'}
            value={searchParams.get('search') || ''}
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
        onDeleteClick={onDeleteClick}
        onEditClick={onEditClick}
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
