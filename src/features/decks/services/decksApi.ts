import { CreateDeckArgs, Deck, DecksListResponse, GetDecksArgs, MinMaxCards } from './decks.types'
import { baseApi } from '@/services/baseApi'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
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

      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks', 'MinMaxCards'],
        query: args => ({
          url: 'v1/decks',
          method: 'POST',
          body: args,
        }),
      }),
    }
  },
})

export const { useGetDecksQuery, useGetDecksMinMaxCardsQuery, useCreateDeckMutation } = decksApi
