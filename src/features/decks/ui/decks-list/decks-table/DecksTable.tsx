import { TableHeader, Sort, Table, TableBody, TableCell, TableRow } from '@/common/components/table'
import { formateDate } from '@/utils/formateDate'
import s from './decks-table.module.scss'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { Link } from 'react-router-dom'
import { Deck } from '@/features/decks/services/decks.types'

import { decksColumns } from './decksColumns'
import { Button } from '@/common/components/button/Button'

type Props = {
  decks: Deck[] | undefined
  // onDeleteClick: (id: string) => void
  // onEditClick: (id: string) => void
  // onFavoriteToggle: (id: string, isFavorite: boolean) => void
  // onSort: (key: Sort) => void
  // sort: Sort
}

export const DecksTable = ({ decks }: Props) => {
  return (
    <Table>
      <TableHeader columns={decksColumns} />

      <TableBody>
        {decks?.map(deck => (
          <TableRow key={deck.id}>
            <TableCell>{deck.name}</TableCell>
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
