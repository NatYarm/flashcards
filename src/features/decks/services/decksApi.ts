import { DecksListResponse, GetDecksArgs, MinMaxCards } from './decks.types'
import { baseApi } from '../../../services/base-api'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => ({
          url: `v2/decks`,
          params: args ?? undefined,
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

export const { useGetDecksQuery, useGetDecksMinMaxCardsQuery } = decksApi
