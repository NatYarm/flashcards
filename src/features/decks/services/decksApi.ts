import { baseApi } from '@/app/services/baseApi'

import {
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDecksArgs,
  MinMaxCards,
  UpdateDeckArgs,
} from './decks.types'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createDeck: builder.mutation<Deck, CreateDeckArgs>({
        invalidatesTags: ['Decks', 'MinMaxCards'],
        query: ({ cover, isPrivate, name }) => {
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }
          if (isPrivate) {
            formData.append('isPrivate', isPrivate.toString())
          }
          if (cover) {
            formData.append('cover', cover)
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks`,
          }
        },
      }),

      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks', 'MinMaxCards'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),

      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
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

      updateDeck: builder.mutation<Deck, UpdateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ id, ...body }) => ({
          body,
          method: 'PATCH',
          url: `v1/decks/${id}`,
        }),
      }),
    }
  },
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDecksMinMaxCardsQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksApi
