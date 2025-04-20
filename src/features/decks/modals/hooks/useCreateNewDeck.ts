import { useState } from 'react'
import { toast } from 'react-toastify'

import { CreateDeckArgs, ErrorResponse } from '@/common/types'
import { useCreateDeckMutation } from '@/features/decks/services'

export const useCreateNewDeck = (clearFilters: () => void) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [createDeck, { isLoading: isLoadingCreateDeck }] = useCreateDeckMutation()

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

  return {
    handleCreateDeck,
    isLoadingCreateDeck,
    onCancelCreateDeck,
    setShowCreateModal,
    showCreateModal,
  }
}
