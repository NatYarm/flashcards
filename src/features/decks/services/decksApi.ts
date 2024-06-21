import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  MinMaxCards,
  UpdateDeckArgs,
} from './decks.types'
import { baseApi } from '@/services/baseApi'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => ({
          url: `v2/decks`,
          params: args ?? undefined,
        }),
        providesTags: ['Decks'],
      }),

      getDecksMinMaxCards: builder.query<MinMaxCards, void>({
        query: () => ({
          url: `v2/decks/min-max-cards`,
        }),
        providesTags: ['MinMaxCards'],
      }),

      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        query: args => ({
          url: 'v1/decks',
          method: 'POST',
          body: args,
        }),
        invalidatesTags: ['Decks', 'MinMaxCards'],
      }),

      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        query: ({ id, ...body }) => ({
          url: `v1/decks/${id}`,
          method: 'PATCH',
          body,
        }),
        invalidatesTags: ['Decks'],
      }),

      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Decks', 'MinMaxCards'],
      }),
    }
  },
})

export const {
  useGetDecksQuery,
  useGetDecksMinMaxCardsQuery,
  useCreateDeckMutation,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
} = decksApi
