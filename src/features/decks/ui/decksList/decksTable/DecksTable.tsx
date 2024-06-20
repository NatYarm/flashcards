import { TableHeader, Table, TableBody, TableCell, TableRow, Sort } from '@/common/components/table'
import { formateDate } from '@/utils/formateDate'
import s from './decksTable.module.scss'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { Link } from 'react-router-dom'
import { Deck } from '@/features/decks/services/decks.types'

import { decksColumns } from './decksColumns'
import { Button } from '@/common/components/button'
import { Typography } from '@/common/components/typography'
import placeholderImg from '@/assets/img/defaultCard.jpg'

type Props = {
  decks: Deck[] | undefined
  // onDeleteClick: (id: string) => void
  // onEditClick: (id: string) => void
  // onFavoriteToggle: (id: string, isFavorite: boolean) => void
  onSort: (key: Sort) => void
  sort: Sort
}

export const DecksTable = ({ decks, sort, onSort }: Props) => {
  return (
    <Table>
      <TableHeader columns={decksColumns} onSort={onSort} sort={sort} />

      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>
              <div className={s.nameCell}>
                <img src={deck.cover ?? placeholderImg} alt={deck.name} className={s.cover} />
                <Typography as={Link} to={`/decks/${deck.id}`} variant="body2">
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
                <Button variant="icon">
                  <Edit2Outline />
                </Button>
                <Button variant="icon">
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
