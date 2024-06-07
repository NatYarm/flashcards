import { Trash } from '@/assets/icons/components'
import { Meta } from '@storybook/react'

import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from './table'

export default {
  component: Table,
  title: 'Components/Table',
} as Meta<typeof Table>

export const Default = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Link</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>JavaScript</TableCell>
            <TableCell>Lorem ipsum dolor sit amet consectetur.</TableCell>
            <TableCell>SomeLink</TableCell>
            <TableCell>Type Description</TableCell>
            <TableCell>
              <Trash />
            </TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
  },
}

const data = [
  {
    category: 'Main',
    description: 'Lorem ipsum dolor sit amet.',
    id: '01',
    link: 'Link',
    title: 'React',
    type: 'Read',
  },
  {
    category: 'Main',
    description: 'Lorem ipsum dolor sit amet.',
    id: '02',
    link: 'Link',
    title: 'JavaScript',
    type: 'Read',
  },
  {
    category: 'Main',
    description: 'Lorem ipsum dolor sit amet.',
    id: '03',
    link: 'Link',
    title: 'Redux',
    type: 'Read',
  },
]

export const WithMapMethod = {
  args: {
    children: (
      <>
        <TableHead>
          <TableRow>
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell align={'center'}>Description</TableHeadCell>
            <TableHeadCell>Link</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.link}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </>
    ),
  },
}
