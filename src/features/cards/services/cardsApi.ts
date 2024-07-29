import { baseApi } from '@/app/services/baseApi'
import { Card, CardId, CreateCardResponse, NextCard, UpdateCardArgs } from '@/common/types'

const cardsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      deleteCard: builder.mutation<undefined, CardId>({
        invalidatesTags: ['Cards', 'Deck'],
        query: ({ id }) => ({
          method: 'DELETE',
          url: `v1/cards/${id}`,
        }),
      }),
      getCardLearn: builder.query<Card, { id: string }>({
        providesTags: ['CardLearn'],
        query: ({ id }) => ({
          url: `v1/decks/${id}/learn`,
        }),
      }),

      saveGradeCard: builder.mutation<Card, NextCard>({
        query: ({ cardId, deckId, grade }) => ({
          body: { cardId, grade },
          method: 'POST',
          url: `v1/decks/${deckId}/learn`,
        }),
      }),
      updateCard: builder.mutation<CreateCardResponse, UpdateCardArgs>({
        invalidatesTags: ['Cards', 'Deck'],
        query: ({ answer, answerImg, id, question, questionImg }) => {
          const formData = new FormData()

          if (answer) {
            formData.append('answer', answer)
          }
          if (answerImg) {
            debugger
            formData.append('answerImg', answerImg)
          } else if (answerImg === null) {
            formData.append('answerImg', '')
          }
          if (question) {
            formData.append('question', question)
          }
          if (questionImg) {
            formData.append('questionImg', questionImg)
          } else if (questionImg === null) {
            formData.append('questionImg', '')
          }

          return {
            body: formData,
            method: 'PATCH',
            url: `v1/cards/${id}`,
          }
        },
      }),
    }
  },
})

export const {
  useDeleteCardMutation,
  useGetCardLearnQuery,
  useSaveGradeCardMutation,
  useUpdateCardMutation,
} = cardsApi
