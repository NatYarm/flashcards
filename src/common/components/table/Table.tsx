import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import ArrowDown from '@/assets/icons/components/ArrowDown'
import ArrowUp from '@/assets/icons/components/ArrowUp'
import clsx from 'clsx'

import s from './table.module.scss'

export const Table = forwardRef<ElementRef<'table'>, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.table, className)

    return <table className={classNames} ref={ref} {...rest} />
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.tr, className)

    return <thead className={classNames} ref={ref} {...rest} />
  }
)
export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.tr, className)

    return <tbody className={classNames} ref={ref} {...rest} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.tr, className)

    return <tr className={classNames} ref={ref} {...rest} />
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ComponentPropsWithoutRef<'th'>>(
  ({ children, className, ...rest }, ref) => {
    const classNames = clsx(s.headCell, className)

    return (
      <th className={classNames} ref={ref} {...rest}>
        <span>{children}</span>
      </th>
    )
  }
)
export const TableCell = forwardRef<ElementRef<'td'>, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.tableCell, className)

    return <td className={classNames} ref={ref} {...rest} />
  }
)

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

type TableHeaderProps = Omit<
  {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  } & ComponentPropsWithoutRef<'thead'>,
  'children'
>

export const TableHeader = ({ columns, onSort, sort, ...restProps }: TableHeaderProps) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return (
    <thead {...restProps}>
      <tr>
        {columns.map(({ key, sortable = true, title }) => (
          <th key={key} onClick={handleSort(key, sortable)}>
            {title}
            {sort && sort.key === key && (
              <span>{sort.direction === 'asc' ? <ArrowUp /> : <ArrowDown />}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
