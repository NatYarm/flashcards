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
<<<<<<< HEAD
          params: args ?? undefined,
          url: `v2/decks`,
=======
          url: `v2/decks`,
          params: args ?? undefined,
>>>>>>> cf651addbcebbe2c1c79869b5831b0fccc8ba67d
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
})

export const { useGetDecksQuery } = flashcardsApi
