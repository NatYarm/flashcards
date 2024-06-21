import { baseApi } from '@/services/baseApi'

import { DecksListResponse, GetDecksArgs, MinMaxCards } from './decks.types'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),

      getDecksMinMaxCards: builder.query<MinMaxCards, void>({
        providesTags: ['MinMaxCards'],
        query: () => ({
          url: `v2/decks/min-max-cards`,
        }),
      }),
    }
  },
})

export const { useGetDecksMinMaxCardsQuery, useGetDecksQuery } = decksApi
