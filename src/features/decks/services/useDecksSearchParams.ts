import { useSearchParams } from 'react-router-dom'
import { useGetDecksMinMaxCardsQuery, useGetDecksQuery } from './decksApi'
import { useState } from 'react'
import { Sort, Tab } from '@/common/components'
import { ErrorResponse } from './decks.types'

export const useDecksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sort, setSort] = useState<Sort>(null)

  const {
    data: minMaxCardsCount,
    error: minMaxCardsCountError,
    isLoading: minMaxCardsCountLoading,
  } = useGetDecksMinMaxCardsQuery()

  const minCardsCount = minMaxCardsCount?.min || 0
  const maxCardsCount = minMaxCardsCount?.max || 35
  const [cardsRange, setCardsRange] = useState([minCardsCount, maxCardsCount])

  const handleSliderValueChange = (value: number[]) => {
    setCardsRange(value)
  }

  //deck name search query
  const handleSearchChange = (value: string) => {
    if (value.length) {
      searchParams.set('name', value)
    } else {
      searchParams.delete('name')
    }
    setSearchParams(searchParams)
  }

  const handleClearInput = () => {
    searchParams.delete('name')
    setSearchParams(searchParams)
  }

  // tabs query
  const tabs: Tab[] = [
    { title: 'My decks', value: 'my', disabled: false },
    { title: 'All decks', value: 'all', disabled: false },
    { title: 'Favorites', value: 'favorites', disabled: false },
  ]

  const currentTab = searchParams.get('currentTab' || 'all')

  const handleTabChange = (tab: string) => {
    searchParams.set('currentTab', tab)
    setSearchParams(searchParams)
  }

  //current page query
  const currentPage = Number(searchParams.get('currentPage') || 1)

  const handlePageChange = (page: number) => {
    searchParams.set('currentPage', page.toString())
    setSearchParams(searchParams)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
  }

  const clearFilters = () => {
    setSort(null)
    setCardsRange([0, maxCardsCount ?? null])
    setSearchParams({})
  }

  const {
    data: decks,
    error: getDecksError,
    isLoading: getDecksLoading,
  } = useGetDecksQuery({
    name: searchParams.get('name') || undefined,
    currentPage,
    itemsPerPage,
    minCardsCount: cardsRange[0],
    maxCardsCount: cardsRange[1],
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const decksLoading = minMaxCardsCountLoading || getDecksLoading

  const error = [
    ...((minMaxCardsCountError as ErrorResponse)?.data.errorMessages || []),
    ...((getDecksError as ErrorResponse)?.data.errorMessages || []),
  ]
  const decksError = error.length ? error : null

  return {
    cardsRange,
    clearFilters,
    currentPage,
    currentTab,
    decks,
    decksError,
    handleClearInput,
    handleItemsPerPageChange,
    handlePageChange,
    handleSearchChange,
    handleSliderValueChange,
    handleTabChange,
    decksLoading,
    itemsPerPage,
    maxCardsCount,
    minCardsCount,
    searchParams,
    setSort,
    sort,
    tabs,
  }
}
