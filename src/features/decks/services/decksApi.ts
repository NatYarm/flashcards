import { baseApi } from '@/app/services/baseApi'
import {
  CreateCardArgs,
  CreateCardResponse,
  CreateDeckArgs,
  Deck,
  DecksListResponse,
  DeleteDeckArgs,
  GetDeckById,
  GetDeckCards,
  GetDeckCardsResponse,
  GetDecksArgs,
  MinMaxCards,
  UpdateDeckArgs,
} from '@/common/types'

export const decksApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createCard: builder.mutation<CreateCardResponse, CreateCardArgs>({
        invalidatesTags: ['Deck', 'Cards'],
        query: ({ answer, answerImg, id, question, questionImg }) => {
          const formData = new FormData()

          if (answer) {
            formData.append('answer', answer)
          }
          if (answerImg) {
            formData.append('answerImg', answerImg)
          }
          if (question) {
            formData.append('question', question)
          }
          if (questionImg) {
            formData.append('questionImg', questionImg)
          }

          return {
            body: formData,
            method: 'POST',
            url: `v1/decks/${id}/cards`,
          }
        },
      }),
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
            url: 'v1/decks',
          }
        },
      }),
      deleteDeck: builder.mutation<void, DeleteDeckArgs>({
        invalidatesTags: ['Decks'],
        /*invalidatesTags: ['Decks', 'MinMaxCards'],*/
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/decks/${id}`,
        }),
      }),

      getDeck: builder.query<Deck, GetDeckById>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
      }),

      getDeckById: builder.query<Omit<Deck, 'author'>, GetDeckById>({
        providesTags: ['Deck'],
        query: ({ id }) => ({
          url: `v1/decks/${id}`,
        }),
      }),

      getDeckCards: builder.query<GetDeckCardsResponse, GetDeckCards>({
        providesTags: ['Cards'],
        query: ({ id, ...params }) => ({
          params: params,
          url: `v1/decks/${id}/cards`,
        }),
      }),

      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        providesTags: ['Decks'],
        query: args => ({
          method: 'GET',
          params: args ?? undefined,
          /*params: { ...(args ?? {}), name: args?.name || undefined },*/
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
        invalidatesTags: ['Decks', 'Deck', 'MinMaxCards'],
        query: ({ cover, id, isPrivate, name }) => {
          const formData = new FormData()

          if (name) {
            formData.append('name', name)
          }
          if (isPrivate !== undefined) {
            formData.append('isPrivate', isPrivate.toString())
          }
          if (cover) {
            formData.append('cover', cover)
          } else if (cover === null) {
            formData.append('cover', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/decks/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckByIdQuery,
  useGetDeckCardsQuery,
  useGetDeckQuery,
  useGetDecksMinMaxCardsQuery,
  useGetDecksQuery,
  useUpdateDeckMutation,
} = decksApi
