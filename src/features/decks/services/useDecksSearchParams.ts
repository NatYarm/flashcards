import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Sort, Tab } from '@/common/components'

import { useGetMeQuery } from '../../auth/api/authApi'
import { ErrorResponse } from './decks.types'
import { useGetDecksMinMaxCardsQuery, useGetDecksQuery } from './decksApi'

export const useDecksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [sort, setSort] = useState<Sort>(null)

  const { data: me } = useGetMeQuery()
  const currentUserId = me?.id

  const {
    data: cardsInDeck,
    error: cardsInDeckError,
    isLoading: cardsInDeckLoading,
  } = useGetDecksMinMaxCardsQuery()

  const minCardsInDeck = cardsInDeck?.min || 0
  const maxCardsInDeck = cardsInDeck?.max || 50
  const [cardsRange, setCardsRange] = useState([minCardsInDeck, maxCardsInDeck])

  useEffect(() => {
    cardsInDeck && setCardsRange([cardsInDeck.min, cardsInDeck.max])
  }, [cardsInDeck])

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
    { disabled: false, title: 'My decks', value: 'my' },
    { disabled: false, title: 'All decks', value: 'all' },
    { disabled: false, title: 'Favorites', value: 'favorites' },
  ]

  const currentTab = searchParams.get('currentTab') || 'all'

  const handleTabChange = (value: string) => {
    searchParams.set('currentTab', value)
    if (value === 'my') {
      searchParams.set('authorId', currentUserId || '')
      searchParams.delete('favoritedBy')
    } else if (value === 'favorites') {
      searchParams.set('favoritedBy', currentUserId || '')
      searchParams.delete('authorId')
    } else {
      searchParams.delete('authorId')
      searchParams.delete('favoritedBy')
    }
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
    setCardsRange([0, maxCardsInDeck])
    setSearchParams({})
  }

  const {
    data: decks,
    error: getDecksError,
    isLoading: getDecksLoading,
  } = useGetDecksQuery({
    authorId: searchParams.get('authorId') || undefined,
    currentPage,
    favoritedBy: searchParams.get('favoritedBy') || undefined,
    itemsPerPage,
    maxCardsCount: cardsRange[1],
    minCardsCount: cardsRange[0],
    name: searchParams.get('name') || undefined,
    orderBy: sort ? `${sort.key}-${sort.direction}` : undefined,
  })

  const decksLoading = getDecksLoading || cardsInDeckLoading

  const error = [
    ...((cardsInDeckError as ErrorResponse)?.data.errorMessages || []),
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
    decksLoading,
    handleClearInput,
    handleItemsPerPageChange,
    handlePageChange,
    handleSearchChange,
    handleSliderValueChange,
    handleTabChange,
    itemsPerPage,
    maxCardsInDeck,
    minCardsInDeck,
    searchParams,
    setSort,
    sort,
    tabs,
  }
}
