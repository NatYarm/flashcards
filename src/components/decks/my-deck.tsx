import { Link } from 'react-router-dom'

import { ArrowBackOutline, Search } from '@/assets/icons/components'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { Typography } from '@/components/ui/typography'

import s from './my-deck.module.scss'

import defaultCard from './../../assets/img/defaultCard.jpg'

export const MyDeck = () => {
  return (
    <div className={s.container} style={{ marginTop: '24px' }}>
      <div className={s.heading}>
        <Link className={`${s.button} ${s.primary} ${s.backBtn}`} to={'/'}>
          <ArrowBackOutline />
          Вернуться на страницу с колодами
        </Link>
        <div className={s.headingSecondRow}>
          <div>
            <div className={s.info}>
              <Typography className={s.h1} variant={'h1'}>
                Number2
              </Typography>
            </div>
            <div className={s.wrapperCoverImg}>
              <img alt={'img'} className={s.coverImg} src={defaultCard} />
            </div>
          </div>
          <div className={s.switchButton}>
            <Button>Добавить карту</Button>
          </div>
        </div>
        <div className={s.fieldWrapper}>
          <Search className={s.searchIcon} />
          <TextField className={s.field} placeholder={'input search'} />
        </div>
      </div>
      <table className={`${s.table} ${s.tableRoot}`}>
        <thead className={s.thead}>
          <tr className={s.row}>
            <th className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Вопрос</button>
              </div>
            </th>
            <th className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Ответ</button>
                <div className={s.boxEye}>
                  <svg>EyeOffIcon</svg>
                </div>
              </div>
            </th>
            <th className={`${s.headCell} ${s.tableHeadCellCards}`}>
              <div className={s.answer}>
                <button className={`${s.subtitle2} ${s.nameSortBtn}`}>Оценка</button>
              </div>
            </th>
            <th className={`${s.headCell} ${s.lastTableHeadCell}`}></th>
          </tr>
        </thead>
        <tbody>
          <tr className={s.row}>
            <td className={s.cell}>
              <div className={s.imgWrapper}>
                <div className={s.wrapperCoverImg}>
                  <img
                    alt={'default card img'}
                    className={`${s.coverImg} ${s.wrapperCoverImg} ${s.withImg}`}
                    src={'/assets/defaultCard-4aAwMWTJ.jpg'}
                  />
                </div>
                <p className={s.body1}>ddd</p>
              </div>
            </td>
            <td className={`${s.cell} ${s.sell}`}>
              <div className={s.blur}>
                <div className={s.imgWrapper}>
                  <div className={s.wrapperCoverImg}>
                    <img
                      alt={'default card img'}
                      className={`${s.coverImg} ${s.wrapperCoverImg} ${s.withImg}`}
                      src={'/assets/defaultCard-4aAwMWTJ.jpg'}
                    />
                  </div>
                  <p className={s.body1}>ddd</p>
                </div>
              </div>
            </td>
            <td className={`${s.cell} ${s.grade}`}>
              <svg className={s.star}>StarIcon</svg>
              <svg className={s.star}>StarIcon</svg>
              <svg className={s.star}>StarIcon</svg>
              <svg className={s.star}>StarIcon</svg>
              <svg className={s.star}>StarIcon</svg>
            </td>
            <td className={s.cell}>
              <div className={s.iconBtns}>
                <button className={`${s.button} ${s.primary} ${s.btn}`}>
                  <svg>EditIcon</svg>
                </button>
                <button className={`${s.button} ${s.primary} ${s.btn}`}>
                  <svg>TrashIcon</svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className={s.footer}>
        <div className={s.box}>
          <div aria-label={'Pagination'} className={s.pagination}>
            <div className={s.pageLinkWrapper}>
              <button className={`${s.button} ${s.primary} ${s.pageLink} ${s.icon} ${s.disabled}`}>
                <svg>ArrowIosBackIcon</svg>
              </button>
            </div>
            <div className={s.pageLinkWrapper}>
              <button
                aria-current={'page'}
                className={`${s.button} ${s.primary} ${s.pageLink} ${s.active}`}
              >
                1
              </button>
            </div>
            <div className={s.pageLinkWrapper}>
              <button className={`${s.button} ${s.primary} ${s.pageLink} ${s.icon} ${s.disabled}`}>
                <svg>ArrowIosForwardIcon</svg>
              </button>
            </div>
          </div>
          <div className={s.boxItem}>
            <p className={`${s.body1} ${s.firstText}`}>Отображать </p>
            <div className={s.selectRoot}>
              <button
                aria-autocomplete={'none'}
                aria-controls={'radix-:r93:'}
                aria-expanded={'false'}
                className={`${s.selectTrigger} ${s.selectTriggerDisabled}`}
                data-state={'closed'}
                dir={'ltr'}
                disabled
                role={'combobox'}
                type={'button'}
              >
                <p className={s.body2}>5</p>
                <svg className={s.selectIcon}>ArrowIosDownIcon</svg>
              </button>
            </div>
            <p className={`${s.body1} ${s.lastText}`}>на странице</p>
          </div>
        </div>
      </div>
    </div>
  )
}
