import { useCallback, useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import { Sort } from '@/common/types'
import { useDebounce } from '@/common/utils'
import { useGetMeQuery } from '@/features/auth/api/authApi'
import { useGetDeckByIdQuery, useGetDeckCardsQuery } from '@/features/decks/services'

export const useDeck = () => {
  const params = useParams()
  const [sort, setSort] = useState<Sort>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const debouncedSearch = useDebounce(searchParams, 500)

  const { data: me } = useGetMeQuery()

  const {
    data: deckData,
    error: deckError,
    isLoading: isLoadingDeck,
  } = useGetDeckByIdQuery({ id: params?.id ?? '' })

  const deck = deckData

  // Определение, является ли текущий пользователь владельцем колоды
  const isMy = me?.id === deck?.userId

  // Обработчик изменения параметра 'question' в строке запроса
  const searchChangeHandle = useCallback(
    (value: string) => {
      const updatedSearchParams = new URLSearchParams(searchParams)

      if (value.length) {
        updatedSearchParams.set('question', value)
      } else {
        updatedSearchParams.delete('question')
      }
      setSearchParams(updatedSearchParams)
    },
    [searchParams, setSearchParams]
  )

  // Обработчик очистки параметра 'question' в строке запроса
  const onClearClick = useCallback(() => {
    const updatedSearchParams = new URLSearchParams(searchParams)

    updatedSearchParams.delete('question')
    setSearchParams(updatedSearchParams)
  }, [searchParams, setSearchParams])

  // Обработчик изменения параметра 'itemsPerPage' в строке запроса
  /*const pageSizeHandler = useCallback(
    (itemsPerPage: string) => {
      const updatedSearchParams = new URLSearchParams(searchParams)

      updatedSearchParams.set('itemsPerPage', itemsPerPage)
      setSearchParams(updatedSearchParams)
    },
    [searchParams, setSearchParams]
  )*/
  const pageSizeHandler = useCallback(
    (itemsPerPage: number) => {
      // Изменение типа параметра на number
      const updatedSearchParams = new URLSearchParams(searchParams)

      updatedSearchParams.set('itemsPerPage', itemsPerPage.toString()) // Преобразование number в string
      setSearchParams(updatedSearchParams)
    },
    [searchParams, setSearchParams]
  )

  // Обработчик изменения параметра 'currentPage' в строке запроса
  const currentPageHandler = useCallback(
    (currentPage: number) => {
      const updatedSearchParams = new URLSearchParams(searchParams)

      updatedSearchParams.set('currentPage', currentPage.toString())
      setSearchParams(updatedSearchParams)
    },
    [searchParams, setSearchParams]
  )

  // Использование useMemo для кэширования строки сортировки
  const sortedString = useMemo(() => {
    const updatedSearchParams = new URLSearchParams(searchParams)

    if (!sort) {
      updatedSearchParams.delete('orderBy')
      setSearchParams(updatedSearchParams)

      return null
    }
    updatedSearchParams.set('orderBy', `${sort.key}-${sort.direction}`)
    setSearchParams(updatedSearchParams)

    return `${sort.key}-${sort.direction}`
  }, [sort, searchParams, setSearchParams])

  // Запрос данных о картах колоды
  const {
    data: cardsData,
    error: cardsError,
    isLoading: isLoadingCards,
  } = useGetDeckCardsQuery({
    currentPage: Number(searchParams.get('currentPage')) || 1,
    id: params?.id ?? '',
    itemsPerPage: Number(searchParams.get('itemsPerPage')) || 5,
    orderBy: sortedString || undefined,
    question: debouncedSearch.get('question') || undefined,
  })

  const cards = cardsData

  // Возвращение данных и обработчиков
  return {
    cards,
    cardsError,
    currentPageHandler,
    deck,
    deckError,
    isLoadingCards,
    isLoadingDeck,
    isMy,
    onClearClick,
    pageSizeHandler,
    searchChangeHandle,
    searchParams,
    setSort,
    sort,
  }
}
