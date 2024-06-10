import { TrashOutline } from '@/assets/icons/components'

import s from './decks-page.module.scss'

import { Button } from '../../ui/button'
import { Page } from '../../ui/page/page'
import { Slider } from '../../ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '../../ui/table/table'
import { Tabs } from '../../ui/tabs/tabs'
import { TextField } from '../../ui/text-field'
import { Typography } from '../../ui/typography'

const tabs = [
  { title: 'My decks', value: 'my' },
  { title: 'All decks', value: 'all' },
  { title: 'Favorites', value: 'favorites' },
]

export const DecksPage = () => {
  return (
    <Page>
      <div className={s.pageHeader}>
        <Typography as={'h1'} variant={'h1'}>
          Decks List
        </Typography>
        <Button>Add New Deck</Button>
      </div>
      <div className={s.filters}>
        <div className={s.searchField}>
          <TextField placeholder={'Search'} type={'search'} />
        </div>

        <Tabs label={'Show decks cards'} tabs={tabs} />

        <Slider label={'Number of cards'} value={[2, 10]} />
        <Button variant={'secondary'}>
          <TrashOutline />
          Clear Filter
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Cards</TableHeadCell>
            <TableHeadCell>Last updated</TableHeadCell>
            <TableHeadCell>Created by</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>New Deck</TableCell>
            <TableCell>4</TableCell>
            <TableCell>23.12.2023</TableCell>
            <TableCell>John Dow</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Page>
  )
}
