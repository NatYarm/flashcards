import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'

import { ArrowBackOutline } from '@/assets/icons/components'
import { Button, Input, Loader, Pagination, TextField, Typography } from '@/common/components'
import { path } from '@/common/enums'
import { ErrorResponse, ErrorResponseField, UpdateCardArgs } from '@/common/types'
import { useCreateCard, useDeleteCard, useUpdateCard } from '@/features/cards/hooks'
import { DeckModal, DeleteDeckModal } from '@/features/decks/modals'
import { CardModal } from '@/features/decks/modals/cardModal/CardModal'
import { useDeck, useDeleteDeck, useUpdateDeck } from '@/features/decks/modals/hooks'
import { useDecksSearchParams } from '@/features/decks/services'
import { DeckDropdown } from '@/features/decks/ui/deck/deckDropdown'

import s from './deck.module.scss'

export const Deck = () => {
  const {
    clearFilters,
    currentPage,
    decks,
    handleClearInput,
    handleItemsPerPageChange,
    handlePageChange,
    handleSearchChange,
    itemsPerPage,
  } = useDecksSearchParams()

  const {
    cards,
    cardsError,
    deck,
    deckError,
    isLoadingCards,
    isLoadingDeck,
    isMy,
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
    setIdTable,
    setUpdateModal,
    setUpdateTable,
    updateModal,
  } = useUpdateCard()

  const { handleDeckDelete, isDeleteModalOpen, isLoadingDeleteDeck, setIsDeleteModalOpen } =
    useDeleteDeck()
  const { createModalCard, isLoadingCreateCard, requestCreate, setCreateModalCard } =
    useCreateCard()
  const { handleDeckUpdate, isEditModalOpen, isLoadingUpdateDeck, setIsEditModalOpen } =
    useUpdateDeck(clearFilters)

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
    setIdTable(id)
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

  const contentSearch = Boolean(searchParams.get('question')) && !cards?.items?.length
  const contentNotCardInDeck = !cards?.items?.length && Boolean(!searchParams.get('question'))

  return (
    <div className={s.main}>
      <Typography as={NavLink} className={`${s.button} ${s.primary} ${s.backBtn}`} to={path.decks}>
        <ArrowBackOutline /> Back to Decks List
      </Typography>

      <div className={s.container}>
        {contentNotCardInDeck ? (
          <div className={s.emptyCardsBlock}>
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
            <div className={s.inputContainer}>
              <TextField
                onClearInput={handleClearInput}
                onValueChange={handleSearchChange}
                placeholder={'Search'}
                type={'search'}
                value={searchParams.get('search') || ''}
              />
            </div>
            <TableCardsList
              cards={cards?.items}
              columnsCards={columnsCards}
              isMy={isMy}
              onDelete={onDelete}
              onEdit={onEdit}
              onSort={setSort}
              sort={sort}
            />
            {contentSearch && (
              <Typography className={s.emptySearch} variant={'body1'}>
                Unfortunately, your search returned no results. Try changing the request.
              </Typography>
            )}
          </div>
        )}
      </div>
      <div className={s.paginationSettings}>
        <Pagination
          className={s.pagination}
          currentPage={currentPage || 1}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onPerPageChange={handleItemsPerPageChange}
          perPageOptions={[5, 10, 20, 30]}
          totalPageCount={decks?.pagination?.totalPages || 1}
        />
      </div>
      <DeleteDeckModal
        onDelete={() => dataDeleteCard?.id && requestDeleteCard(dataDeleteCard?.id)}
        onOpenChange={setDeleteModalCard}
        open={deleteModalCard}
        text={`Do you really want to remove ${dataDeleteCard?.title}?\n` + `Card will be deleted.`}
        title={'Delete Card'}
      />
      <CardModal
        defaultValues={dataUpdateTable}
        onOpenChange={setUpdateModal}
        onSubmit={requestUpdate}
        open={updateModal}
        title={'Edit Card'}
      />
      <CardModal
        onOpenChange={setCreateModalCard}
        onSubmit={requestCreate}
        open={createModalCard}
        title={'Create Card'}
      />
      <DeckModal
        defaultValues={deck && { cover: deck?.cover, isPrivate: deck?.isPrivate, name: deck?.name }}
        onOpenChange={setIsEditModalOpen}
        onSubmit={args => deck && handleDeckUpdate({ ...args, id: deck.id })}
        open={isEditModalOpen}
        title={'Edit Deck'}
      />
      <DeleteDeckModal
        onDelete={() => deck && handleDeckDelete()}
        onOpenChange={setIsDeleteModalOpen}
        open={isDeleteModalOpen}
        text={`Do you really want to remove ${deck?.name}?\n` + 'All cards will be deleted.'}
        title={'Delete Deck'}
      />
    </div>
  )
}

Deck.displayName = 'Deck'

/*
import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline, Edit2Outline, Eye, Star, TrashOutline } from '@/assets/icons/components'
import KeyboardArrowUp from '@/assets/icons/components/KeyboardArrowUp'
import defaultCard from '@/assets/img/defaultCard.jpg'
import { Button } from '@/common/components/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/common/components/table'
import { TextField } from '@/common/components/textField'
import { Typography } from '@/common/components/typography'
import { path } from '@/common/enums'

import s from './deck.module.scss'

export const Deck = () => {
  const { deckId } = useParams()

  return (
    <div className={s.container} style={{ marginTop: '24px' }}>
      <div className={s.heading}>
        <Link className={`${s.button} ${s.primary} ${s.backBtn}`} to={path.base}>
          <ArrowBackOutline />
          Back to Decks List
        </Link>
        <div className={s.headingSecondRow}>
          <div>
            <div className={s.info}>
              <Typography as={'h1'} className={s.h1} variant={'h1'}>
                Number2
              </Typography>
            </div>
            <div className={s.imageContainer}>
              <img alt={'img'} src={defaultCard} />
            </div>
          </div>
          <div className={s.switchButton}>
            <Button as={Link} to={`/decks/${deckId}/learn`}>
              Learn Cards
            </Button>
          </div>
        </div>
        <div className={s.fieldWrapper}>
          <TextField placeholder={'input search'} type={'search'} />
        </div>
      </div>
      <Table className={`${s.table} ${s.tableRoot}`}>
        <TableHead className={s.thead}>
          <TableRow className={s.row}>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Question</button>
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Answer</button>
                <Eye />
                {/!*<div className={s.boxEye}>
                  <Eye />
                </div>*!/}
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Last Updated</button>
                <KeyboardArrowUp />
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Grade</button>
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.lastTableHeadCell}`}></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={s.row}>
            <TableCell className={s.cell}>
              <div className={s.imgWrapper}>
                <div className={s.wrapperCoverImg}>
                  <img
                    alt={'default card img'}
                    className={`${s.coverImg} ${s.wrapperCoverImg} ${s.withImg}`}
                    src={defaultCard}
                  />
                </div>
                <p className={s.body1}>ddd</p>
              </div>
            </TableCell>
            <TableCell className={`${s.cell} ${s.sell}`}>
              <div className={s.blur}>
                <div className={s.imgWrapper}>
                  <div className={s.wrapperCoverImg}>
                    <img
                      alt={'default card img'}
                      className={`${s.coverImg} ${s.wrapperCoverImg} ${s.withImg}`}
                      src={defaultCard}
                    />
                  </div>
                  <p className={s.body1}>ddd</p>
                </div>
              </div>
            </TableCell>
            <TableCell className={s.cell}>
              <p className={s.body1}>16.06.24</p>
            </TableCell>
            <TableCell className={`${s.cell} ${s.grade}`}>
              <Star className={s.star} />
              <Star className={s.star} />
              <Star className={s.star} />
              <Star className={s.star} />
              <Star className={s.star} />
            </TableCell>
            <TableCell className={s.cell}>
              <div className={s.iconBtns}>
                <button className={`${s.button} ${s.primary} ${s.btn}`}>
                  <Edit2Outline />
                </button>
                <button className={`${s.button} ${s.primary} ${s.btn}`}>
                  <TrashOutline />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
*/
