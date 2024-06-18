import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline, Edit2Outline, Eye, Star, TrashOutline } from '@/assets/icons/components'
import KeyboardArrowUp from '@/assets/icons/components/KeyboardArrowUp'
import { Button } from '@/common/components/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/common/components/table'
import { TextField } from '@/common/components/text-field'
import { Typography } from '@/common/components/typography'

import s from './deck.module.scss'

import defaultCard from '@/assets/img/defaultCard.jpg'

export const Deck = () => {
  const { deckId } = useParams()
  return (
    <div className={s.container} style={{ marginTop: '24px' }}>
      <div className={s.heading}>
        <Link className={`${s.button} ${s.primary} ${s.backBtn}`} to={'/'}>
          <ArrowBackOutline />
          Back to Decks List
        </Link>
        <div className={s.headingSecondRow}>
          <div>
            <div className={s.info}>
              <Typography className={s.h1} variant={'h1'}>
                Number2
              </Typography>
            </div>
            <div className={s.imageContainer}>
              <img alt={'img'} src={defaultCard} />
            </div>
          </div>
          <div className={s.switchButton}>
            <Button as={Link} to={`/decks/${deckId}/learn`}>
              Learn Cards
            </Button>
          </div>
        </div>
        <div className={s.fieldWrapper}>
          <TextField placeholder={'input search'} type={'search'} />
        </div>
      </div>
      <Table className={`${s.table} ${s.tableRoot}`}>
        <TableHead className={s.thead}>
          <TableRow className={s.row}>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Question</button>
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Answer</button>
                <Eye />
                {/*<div className={s.boxEye}>
                  <Eye />
                </div>*/}
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Last Updated</button>
                <KeyboardArrowUp />
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Grade</button>
              </div>
            </TableHeadCell>
            <TableHeadCell className={`${s.headCell} ${s.lastTableHeadCell}`}></TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow className={s.row}>
            <TableCell className={s.cell}>
              <div className={s.imgWrapper}>
                <div className={s.wrapperCoverImg}>
                  <img
                    alt={'default card img'}
                    className={`${s.coverImg} ${s.wrapperCoverImg} ${s.withImg}`}
                    src={defaultCard}
                  />
                </div>
                <p className={s.body1}>ddd</p>
              </div>
            </TableCell>
            <TableCell className={`${s.cell} ${s.sell}`}>
              <div className={s.blur}>
                <div className={s.imgWrapper}>
                  <div className={s.wrapperCoverImg}>
                    <img
                      alt={'default card img'}
                      className={`${s.coverImg} ${s.wrapperCoverImg} ${s.withImg}`}
                      src={defaultCard}
                    />
                  </div>
                  <p className={s.body1}>ddd</p>
                </div>
              </div>
            </TableCell>
            <TableCell className={s.cell}>
              <p className={s.body1}>16.06.24</p>
            </TableCell>
            <TableCell className={`${s.cell} ${s.grade}`}>
              <Star className={s.star} />
              <Star className={s.star} />
              <Star className={s.star} />
              <Star className={s.star} />
              <Star className={s.star} />
            </TableCell>
            <TableCell className={s.cell}>
              <div className={s.iconBtns}>
                <button className={`${s.button} ${s.primary} ${s.btn}`}>
                  <Edit2Outline />
                </button>
                <button className={`${s.button} ${s.primary} ${s.btn}`}>
                  <TrashOutline />
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
