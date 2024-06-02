import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { Select } from '../select'
import { SelectItem } from '../select/selectItem'
import { usePagination } from './usePagination'

type Props = {
  className?: string
  currentPage: number
  itemsPerPage?: number
  onItemsPerPageChange?: (itemsPerPage: number) => void
  onPageChange: (page: number) => void
  siblingCount?: number
  totalPageCount: number
}

export const Pagination = ({
  className,
  currentPage,
  itemsPerPage,
  onPageChange,
  siblingCount,
  totalPageCount,
}: Props) => {
  const {
    firstPage,
    handleMainPageClicked,
    handleNextPageClicked,
    handlePrevPageClicked,
    lastPage,
    paginationRange,
  } = usePagination({ currentPage, onPageChange, siblingCount, totalPageCount })

  return (
    <>
      <div className={s.container}>
        <PrevButton disabled={firstPage} onClick={handlePrevPageClicked} />
        <PaginationButtons
          currentPage={currentPage}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton disabled={lastPage} onClick={handleNextPageClicked} />
      </div>
      <ItemsPerPageSelect itemsPerPage={10} itemsPerPageOptions={[10, 20, 30]} />
    </>
  )
}

type NavigationButtonProps = {
  disabled?: boolean
  onClick: () => void
}

type PageButtonProps = {
  page: number
  selected: boolean
} & NavigationButtonProps

const PageButton = ({ disabled, onClick, page, selected }: PageButtonProps) => {
  return (
    <button
      className={clsx(s.item, selected && s.selected)}
      disabled={selected || disabled}
      onClick={onClick}
    >
      {page}
    </button>
  )
}
const PrevButton = ({ disabled, onClick }: NavigationButtonProps) => {
  return (
    <button className={s.item} disabled={disabled} onClick={onClick}>
      <ChevronLeftIcon className={s.icon} />
    </button>
  )
}
const NextButton = ({ disabled, onClick }: NavigationButtonProps) => {
  return (
    <button className={s.item} disabled={disabled} onClick={onClick}>
      <ChevronRightIcon className={s.icon} />
    </button>
  )
}

const Dots = () => {
  return <span>&#8230;</span>
}

type PaginationButtonsProps = {
  currentPage: number
  onClick: (pageNumber: number) => () => void
  paginationRange: (number | string)[]
}

const PaginationButtons = ({ currentPage, onClick, paginationRange }: PaginationButtonsProps) => {
  return (
    <>
      {paginationRange.map((page: number | string, idx) => {
        const isSelected = page === currentPage

        if (typeof page !== 'number') {
          return <Dots key={idx} />
        }

        return <PageButton key={idx} onClick={onClick(page)} page={page} selected={isSelected} />
      })}
    </>
  )
}

type ItemsPerPageProps = {
  itemsPerPage: number
  itemsPerPageOptions: number[]
  //onItemsPerPageChange: (itemsPerPage: number) => void
}

export const ItemsPerPageSelect = ({
  itemsPerPage,
  itemsPerPageOptions,
  //onItemsPerPageChange,
}: ItemsPerPageProps) => {
  const options = itemsPerPageOptions.map(option => ({ label: option, option }))

  return (
    <div className={s.selectContainer}>
      Show
      <Select className={s.select}>
        {options.map(opt => (
          <SelectItem key={opt.option} value={opt.option.toString()}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
      items per page
    </div>
  )
}
