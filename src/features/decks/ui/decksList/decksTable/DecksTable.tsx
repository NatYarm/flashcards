import { Link, NavLink } from 'react-router-dom'

import {
  Edit2Outline,
  PlayCircleOutline,
  TrashOutline,
  VisibilityOff,
} from '@/assets/icons/components'
import placeholderImg from '@/assets/img/defaultCard.jpg'
import { Button } from '@/common/components/button'
import { Sort, Table, TableBody, TableCell, TableHeader, TableRow } from '@/common/components/table'
import { Typography } from '@/common/components/typography'
import { formateDate } from '@/common/utils/formateDate'
import { Deck } from '@/features/decks/services/decks.types'
import clsx from 'clsx'

import s from './decksTable.module.scss'

import { decksColumns } from './decksColumns'

type Props = {
  currentUserId: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string) => void
  onEditClick: (deck: Deck) => void
  // onFavoriteToggle: (id: string, isFavorite: boolean) => void
  onSort?: (key: Sort) => void
  sort?: Sort
}

export const DecksTable = ({
  currentUserId,
  decks,
  onDeleteClick,
  onEditClick,
  onSort,
  sort,
}: Props) => {
  const handleDeleteClick = (id: string) => {
    onDeleteClick(id)
  }

  return (
    <Table>
      <TableHeader columns={decksColumns} onSort={onSort} sort={sort} />

      <TableBody>
        {decks?.map(deck => {
          const isMyDeck = deck.author.id === currentUserId

          return (
            <TableRow className={s.row} key={deck.id}>
              <TableCell>
                <NavLink
                  className={clsx(s.nameCell, { [s.myDeck]: isMyDeck })}
                  to={`/decks/${deck.id}`}
                >
                  <img alt={deck.name} className={s.cover} src={deck.cover ?? placeholderImg} />
                  <Typography variant={'body2'}>{deck.name}</Typography>
                  {deck.isPrivate && <VisibilityOff className={s.privateDeck} />}
                </NavLink>
              </TableCell>
              <TableCell>{deck.cardsCount}</TableCell>
              <TableCell>{formateDate(deck.updated)}</TableCell>
              <TableCell>{deck.author.name}</TableCell>
              <TableCell>
                <div className={s.iconsContainer}>
                  <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                    <PlayCircleOutline
                      className={clsx(s.icon, { [s.disabled]: deck.cardsCount === 0 })}
                    />
                  </Button>
                  {isMyDeck && (
                    <>
                      <Button onClick={() => onEditClick(deck)} variant={'icon'}>
                        <Edit2Outline className={s.icon} />
                      </Button>
                      <Button onClick={() => handleDeleteClick(deck.id)} variant={'icon'}>
                        <TrashOutline className={s.icon} />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
