import { TrashOutline } from '@/assets/icons/components'
import { useGetDecksQuery } from '@/services/flashcards-api'

import s from './decks-page.module.scss'

import { Button } from '../../ui/button'
import { Page } from '../../ui/page/page'
import { Pagination } from '../../ui/pagination'
import { Slider } from '../../ui/slider'

import { Loader } from '../../loader/loader'
import { Tabs } from '../../ui/tabs/tabs'
import { TextField } from '../../ui/text-field'
import { Typography } from '../../ui/typography'
import { DecksTable } from './decks-table/decks-table'
import { useState } from 'react'




export const DecksPage = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentTab, setCurrentTab] = useState('all')
  const [minCardsCount, setMinCardsCount]=useState(0)
  const [maxCardsCount, setMaxCardsCount]=useState(35)
  const [cardsRange, setCardsRange] = useState([minCardsCount, maxCardsCount])
  
  const {data: decks, error, isLoading } = useGetDecksQuery({name: search,  currentPage, itemsPerPage, minCardsCount, maxCardsCount})

  const tabs = [
    { title: 'My decks', value: 'my' },
    { title: 'All decks', value: 'all' },
    { title: 'Favorites', value: 'favorites' },
  ]
  
  const handlePageChange = (page: number)=> {
    setCurrentPage(page)
    }
    
    const handleItemsPerPageChange = (items: number) => {
      setItemsPerPage(items)
      }
      
      const handleTabChange = (tab: string)=> {
        setCurrentTab(tab)
        }
        
        
      const handleSliderCommitted = (value: number[]) => {   
        setMinCardsCount(value[0])
        setMaxCardsCount(value[1])        
        }

  if (isLoading) {
    return <Loader/>
  }

  if(error) {
    return <h1>{JSON.stringify(error)}</h1>
  }

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
          <TextField placeholder={'Search'} type={'search'} value={search} onChange={e=>setSearch(e.currentTarget.value)}/>
        </div>

        <Tabs label={'Show decks cards'} tabs={tabs} value={currentTab ?? undefined} onValueChange={handleTabChange} />

        <Slider label={'Number of cards'} 
        value={cardsRange}   max={35}
        onValueChange={setCardsRange}
        onValueCommit={handleSliderCommitted}   
          />

        <Button variant={'secondary'}>
          <TrashOutline />
          Clear Filters
        </Button>
      </div>
      <DecksTable decks={decks?.items}/>
      
      <Pagination currentPage={currentPage || 1} totalPageCount={decks?.pagination.totalPages || 1} onPageChange={handlePageChange} className={s.pagination} itemsPerPage={itemsPerPage} onPerPageChange={handleItemsPerPageChange} perPageOptions={[5, 10, 20, 30]}/>
    </Page>
  )
}
