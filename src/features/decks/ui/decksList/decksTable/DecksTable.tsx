import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import placeholderImg from '@/assets/img/defaultCard.jpg'
import { Button } from '@/common/components/button'
import { Sort, Table, TableBody, TableCell, TableHeader, TableRow } from '@/common/components/table'
import { Typography } from '@/common/components/typography'
import { Deck } from '@/features/decks/services/decks.types'
import { formateDate } from '@/utils/formateDate'

import s from './decksTable.module.scss'

import { decksColumns } from './decksColumns'

type Props = {
  decks: Deck[] | undefined
  // onDeleteClick: (id: string) => void
  // onEditClick: (id: string) => void
  // onFavoriteToggle: (id: string, isFavorite: boolean) => void
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({ decks, onSort, sort }: Props) => {
  return (
    <Table>
      <TableHeader columns={decksColumns} onSort={onSort} sort={sort} />

      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <div className={s.nameCell}>
                <img alt={deck.name} className={s.cover} src={deck.cover ?? placeholderImg} />
                <Typography as={Link} to={`/decks/${deck.id}`} variant={'body2'}>
                  {deck.name}
                </Typography>
              </div>
            </TableCell>
            <TableCell>{deck.cardsCount}</TableCell>
            <TableCell>{formateDate(deck.updated)}</TableCell>
            <TableCell>{deck.author.name}</TableCell>
            <TableCell>
              <div className={s.iconsContainer}>
                <Button as={Link} to={`/decks/${deck.id}/learn`} variant={'icon'}>
                  <PlayCircleOutline />
                </Button>

                <Button variant={'icon'}>
                  <Edit2Outline />
                </Button>
                <Button variant={'icon'}>
                  <TrashOutline />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
