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
import { Deck } from '@/common/types/decksTypes'
import { formateDate } from '@/common/utils/formateDate'
import clsx from 'clsx'

import s from './decksTable.module.scss'

import { decksColumns } from './decksColumns'

type Props = {
  currentUserId: string
  decks: Deck[] | undefined
  onDeleteClick: (id: string, deckName: string) => void
  onEditClick: (deck: Deck) => void
  //onFavoriteToggle: (id: string, isFavorite: boolean) => void
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
  return (
    <Table>
      <TableHeader columns={decksColumns} onSort={onSort} sort={sort} />

      <TableBody>
        {decks?.map(deck => {
          const isPrivateDeck = deck.author.id === currentUserId

          return (
            <TableRow className={s.row} key={deck.id}>
              <TableCell>
                <NavLink
                  className={clsx(s.nameCell, { [s.myDeck]: isPrivateDeck })}
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
                  <Button
                    as={Link}
                    className={clsx({ [s.disabled]: deck.cardsCount === 0 })}
                    to={`/decks/${deck.id}/learn`}
                    variant={'icon'}
                  >
                    <PlayCircleOutline className={s.icon} />
                  </Button>
                  {isPrivateDeck && (
                    <>
                      <Button onClick={() => onEditClick(deck)} variant={'icon'}>
                        <Edit2Outline className={s.icon} />
                      </Button>
                      <Button onClick={() => onDeleteClick(deck.id, deck.name)} variant={'icon'}>
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
