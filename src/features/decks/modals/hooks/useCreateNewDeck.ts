import { useState } from 'react'
import { toast } from 'react-toastify'

import {
  CreateDeckArgs,
  ErrorResponse,
  useCreateDeckMutation,
  useDecksSearchParams,
} from '@/features/decks/services'

export const useCreateNewDeck = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { clearFilters } = useDecksSearchParams()

  const [createDeck, { isLoading: creatingDeck }] = useCreateDeckMutation()

  const onCancelCreateDeck = () => {
    setShowCreateModal(false)
  }

  const handleCreateDeck = async (data: CreateDeckArgs) => {
    try {
      await createDeck(data).unwrap()
      setShowCreateModal(false)
      clearFilters()
    } catch (e) {
      const error = e as ErrorResponse

      toast.error(error.data?.errorMessages[0].message ?? 'Failed to create a new deck')
    }
  }

  return { creatingDeck, handleCreateDeck, onCancelCreateDeck, setShowCreateModal, showCreateModal }
}
