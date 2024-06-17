import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { DecksListResponse, GetDecksArgs } from '../features/decks/services/decks.types'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => ({
          url: `v2/decks`,
          params: args ?? undefined,
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
})

export const { useGetDecksQuery } = flashcardsApi
