import { Column } from '@/common/components'

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
    key: 'author.name',
    sortable: true,
    title: 'Created by',
  },
  {
    key: 'tools',
    sortable: false,
    title: '',
  },
]
