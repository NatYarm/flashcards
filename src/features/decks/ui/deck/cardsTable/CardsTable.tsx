import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/common/components'
import { ContainerImageText } from '@/common/components/table/ui/containerImageText'
import { Grade } from '@/common/components/table/ui/grade/Grade'
import { Tools } from '@/common/components/table/ui/tools/Tools'
import { Card, CardById, Column, GradeScale, Sort } from '@/common/types'

type Props = {
  cards?: Card[] | undefined
  cardsColumns: Column[]
  isMy: boolean
  onDelete?: (idCard: string, question: string) => void
  onEdit?: (args: CardById) => void
  onSort: (sort: Sort) => void
  sort: Sort
}

type CardsTableProps = ComponentPropsWithoutRef<'table'> & Props
export const CardsTable = forwardRef<ElementRef<'table'>, CardsTableProps>((props, ref) => {
  const { cards, cardsColumns, isMy, onDelete, onEdit, onSort, sort, ...rest } = props
  const columns = cardsColumns.filter(column => (isMy ? column : column.key !== 'tools'))
  const onDeleteHandler = (id: string, question: string) => {
    if (onDelete) {
      onDelete(id, question)
    }
  }
  const onEditHandler = (args: CardById) => {
    if (onEdit) {
      onEdit(args)
    }
  }
  const getDateString = (date: Date | string, locales: string = 'ru-RU') => {
    return new Date(date).toLocaleDateString(locales)
  }

  return (
    <Table {...rest} ref={ref}>
      <TableHeader columns={columns} onSort={onSort} sort={sort} />
      <TableBody>
        {cards?.map(card => {
          return (
            <TableRow key={card.id}>
              <TableCell>
                <ContainerImageText img={card.questionImg} text={card.question} />
              </TableCell>
              <TableCell>
                <ContainerImageText img={card.answerImg} text={card.answer} />
              </TableCell>
              <TableCell>{getDateString(card.updated)}</TableCell>
              <TableCell>
                <Grade currentGrade={card.grade as GradeScale} />
              </TableCell>
              {isMy && (
                <TableCell>
                  <Tools
                    canUsePlay={false}
                    id={card.id}
                    onDelete={id => onDeleteHandler(id, card.question)}
                    onEdit={(idCard: string) =>
                      onEditHandler({
                        answer: card.answer,
                        answerImg: card.answerImg,
                        id: idCard,
                        question: card.question,
                        questionImg: card.questionImg,
                      })
                    }
                  />
                </TableCell>
              )}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
})

CardsTable.displayName = 'CardsTable'
