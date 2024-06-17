import { Column } from '@/components/ui/table/TableHeader'

export const decksColumns: Column[] = [
  {
    key: 'name',
    sortable: true,
    title: 'Name',
  },
  {
    key: 'cardsCount',
    sortable: true,
    title: 'Cards',
  },
  {
    key: 'updated',
    sortable: true,
    title: 'Last Updated',
  },
  {
    key: 'author',
    sortable: true,
    title: 'Created by',
  },
  {
    key: 'tools',
    sortable: false,
    title: '',
  },
]
