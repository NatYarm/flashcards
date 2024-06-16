
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/components/ui/table/table'
import { formateDate } from "@/utils/formateDate"
import s from './decks-table.module.scss'
import { Button } from "@/components/ui/button"
import { Edit2Outline, PlayCircleOutline, TrashOutline } from "@/assets/icons/components"
import { Link } from "react-router-dom"
import { Deck } from '@/services/decks/decks.types'

type Props  = {
	decks: Deck[] | undefined
}

export const DecksTable = ({decks}: Props) => {

	return (
		<Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last updated</TableHeadCell>
            <TableHeadCell>Created by</TableHeadCell>
						<TableHeadCell/>
          </TableRow>
        </TableHead>
        <TableBody>
        {decks?.map(deck=> (
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
									<Edit2Outline/>
								</Button>
								<Button variant="icon">
									<TrashOutline/>
								</Button>
							</div>
						</TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
	)
}

