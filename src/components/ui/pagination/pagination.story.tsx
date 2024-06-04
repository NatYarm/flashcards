import { useState } from 'react'

import { Meta, StoryFn } from '@storybook/react'

import { Pagination, PaginationProps } from './pagination'

// Define meta information for the component
const meta: Meta<typeof Pagination> = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
}

export default meta

// Define a type for the component props
type PaginationStoryProps = {
  perPageOptions: number[]
  totalPageCount: number
} & PaginationProps

// Define the Template type
const Template: StoryFn<PaginationStoryProps> = args => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePerPageChange = (count: number) => {
    setItemsPerPage(count)
  }

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      onPageChange={handlePageChange}
      onPerPageChange={handlePerPageChange}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  perPageOptions: [10, 20, 30, 50],
  totalPageCount: 10,
}
