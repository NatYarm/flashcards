import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { CreateCardBody, ErrorResponseField } from '@/common/types'
import { useCreateCardMutation } from '@/features/decks/services'

export const useCreateCard = () => {
  const [createModalCard, setCreateModalCard] = useState<boolean>(false)
  const [createCard, { isLoading: isLoadingCreateCard }] = useCreateCardMutation()
  const params = useParams()
  const requestCreate = async (args: CreateCardBody) => {
    if (params.id) {
      try {
        await createCard({ ...args, id: params.id }).unwrap()
        toast.success('Card Create')
      } catch (e) {
        const error = e as ErrorResponseField

        toast.error(error.data.message ?? 'Create Card failed')
      } finally {
        setCreateModalCard(false)
      }
    }
  }

  return {
    createModalCard,
    isLoadingCreateCard,
    requestCreate,
    setCreateModalCard,
  }
}
