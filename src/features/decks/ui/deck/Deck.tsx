import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ArrowBackOutline } from '@/assets/icons/components'
import { Button, Loader, Pagination, TextField, Typography } from '@/common/components'
import { path } from '@/common/enums'
import { ErrorResponse, ErrorResponseField, UpdateCardArgs } from '@/common/types'
import { useCreateCard, useDeleteCard, useUpdateCard } from '@/features/cards/hooks'
import { DeckModal, DeleteDeckModal } from '@/features/decks/modals'
import { CardModal } from '@/features/decks/modals/cardModal/CardModal'
import {
  useCreateNewDeck,
  useDeck,
  useDeleteDeck,
  useUpdateDeck,
} from '@/features/decks/modals/hooks'
import { useDecksSearchParams } from '@/features/decks/services'
import { CardsTable } from '@/features/decks/ui/deck/cardsTable/CardsTable'
import { cardsColumns } from '@/features/decks/ui/deck/cardsTable/cardsColumns'
import { DeckDropdown } from '@/features/decks/ui/deck/deckDropdown'

import s from './deck.module.scss'

export const Deck = () => {
  const { clearFilters } = useDecksSearchParams()

  const {
    cards,
    cardsError,
    currentPageHandler, // Добавлен вызов currentPageHandler из useDeck
    deck,
    deckError,
    isLoadingCards,
    isLoadingDeck,
    isMy,
    onClearClick,
    pageSizeHandler, // Добавлен вызов pageSizeHandler из useDeck
    searchChangeHandle,
    searchParams,
    setSort,
    sort,
  } = useDeck()

  const {
    dataDeleteCard,
    deleteModalCard,
    isLoadingDeleteCard,
    requestDeleteCard,
    setDataDeleteCard,
    setDeleteModalCard,
  } = useDeleteCard()

  const {
    dataUpdateTable,
    isLoadingUpdateCard,
    requestUpdate,
    setDataIdTable,
    setUpdateModal,
    setUpdateTable,
    updateModal,
  } = useUpdateCard()

  const { deckName, isDeleteModalOpen, isLoadingDeleteDeck, setIsDeleteModalOpen } = useDeleteDeck()
  const { createModalCard, isLoadingCreateCard, requestCreate, setCreateModalCard } =
    useCreateCard()

  const { isEditModalOpen, isLoadingUpdateDeck, setIsEditModalOpen } = useUpdateDeck(clearFilters)

  const { handleCreateDeck } = useCreateNewDeck(clearFilters)

  if (
    isLoadingDeck ||
    isLoadingCards ||
    isLoadingDeleteCard ||
    isLoadingUpdateCard ||
    isLoadingCreateCard ||
    isLoadingDeleteDeck ||
    isLoadingUpdateDeck
  ) {
    return (
      <div className={s.preloader}>
        <Loader />
      </div>
    )
  }

  if (deckError || cardsError) {
    if (deckError) {
      const errDeck = deckError as ErrorResponse
      const Error = errDeck.data.errorMessages.reduce((acc, error) => {
        return acc + String(error)
      }, '')

      toast.error(Error ?? 'Registration failed')
    }

    if (cardsError) {
      const error = cardsError as ErrorResponseField

      toast.error(error.data.message ?? 'Registration failed')
    }
  }

  const onDelete = (idCard: string, question: string) => {
    setDeleteModalCard(true)
    setDataDeleteCard({ id: idCard, title: question })
  }
  const onEdit = ({ id, ...args }: UpdateCardArgs) => {
    setUpdateTable(args)
    setDataIdTable(id)
    setUpdateModal(true)
  }

  const onAddCard = () => {
    setCreateModalCard(true)
  }
  const onDeleteDeck = () => {
    setIsDeleteModalOpen(true)
  }

  const onEditDeck = () => {
    setIsEditModalOpen(true)
  }

  const contentNotCardInDeck = !cards?.items?.length && Boolean(!searchParams.get('question'))

  return (
    <div className={s.main}>
      <Typography as={NavLink} className={`${s.button}`} to={`${path.decks}`} variant={'body2'}>
        <ArrowBackOutline /> Back to Decks List
      </Typography>

      <div className={s.container}>
        {contentNotCardInDeck ? (
          <div className={s.emptyCards}>
            <Typography as={'h1'} variant={'h1'}>
              {deck?.name}
            </Typography>
            {deck?.cover && <img alt={'Image Deck'} className={s.img} src={deck?.cover} />}
            <div className={s.emptyText}>
              <Typography as={'p'} variant={'body1'}>
                This deck is empty.
                {isMy && ' Click add new card to fill this deck'}
              </Typography>
              {isMy && <Button onClick={onAddCard}>Add New Card</Button>}
            </div>
          </div>
        ) : (
          <div className={s.container}>
            <div className={s.titleCoverBlock}>
              <div className={s.titleBlock}>
                <div className={s.containerMyDeck}>
                  <Typography as={'h1'} variant={'h1'}>
                    {deck?.name}
                  </Typography>
                  {isMy && (
                    <DeckDropdown
                      deckId={deck?.id}
                      onDeleteDeck={onDeleteDeck}
                      onEditDeck={onEditDeck}
                    />
                  )}
                </div>
                {isMy ? (
                  <Button onClick={onAddCard}>Add New Card</Button>
                ) : (
                  <Button as={Link} to={`/decks/${deck?.id || ''}/learn`}>
                    Learn to deck
                  </Button>
                )}
              </div>
              {deck?.cover && <img alt={'Image Deck'} className={s.img} src={deck?.cover} />}
            </div>

            <div className={s.inputContainer}>
              <TextField
                onClearInput={onClearClick}
                onValueChange={searchChangeHandle}
                placeholder={'question'}
                type={'search'}
                value={searchParams.get('question') || ''}
              />
            </div>
            <CardsTable
              cards={cards?.items}
              cardsColumns={cardsColumns}
              isMy={isMy}
              onDelete={onDelete}
              onEdit={onEdit}
              onSort={setSort}
              sort={sort}
            />
            <div className={s.paginationSettings}>
              <Pagination
                className={s.pagination}
                currentPage={Number(searchParams.get('currentPage')) || 1} // Добавлен вызов currentPageHandler из useDeck
                itemsPerPage={Number(searchParams.get('itemsPerPage')) || 5} // Добавлен вызов pageSizeHandler из useDeck
                onPageChange={currentPageHandler} // Используем currentPageHandler из useDeck
                onPerPageChange={pageSizeHandler} // Используем pageSizeHandler из useDeck
                perPageOptions={[5, 10, 20, 30]}
                totalPageCount={cards?.pagination?.totalPages || 1}
              />
            </div>
          </div>
        )}
      </div>
      <DeleteDeckModal
        deckName={deckName ?? 'Delete Card'}
        onConfirm={() => dataDeleteCard?.id && requestDeleteCard(dataDeleteCard?.id)}
        onOpenChange={setDeleteModalCard}
        open={deleteModalCard}
      />

      <CardModal
        defaultValues={dataUpdateTable}
        onConfirm={requestUpdate}
        onOpenChange={setUpdateModal}
        open={updateModal}
        title={'Edit Card'}
      />
      <CardModal
        onConfirm={requestCreate}
        onOpenChange={setCreateModalCard}
        open={createModalCard}
        title={'Add New Card'}
      />
      <DeckModal
        defaultValues={deck && { cover: deck?.cover, isPrivate: deck?.isPrivate, name: deck?.name }}
        onConfirm={handleCreateDeck}
        onOpenChange={setIsEditModalOpen}
        open={isEditModalOpen}
        title={'Edit Deck'}
      />
      <DeleteDeckModal
        deckName={deckName ?? 'Delete Deck'}
        onConfirm={onDeleteDeck}
        onOpenChange={setIsDeleteModalOpen}
        open={isDeleteModalOpen}
      />
    </div>
  )
}

Deck.displayName = 'Deck'
