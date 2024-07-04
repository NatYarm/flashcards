import { useState } from 'react'
import { toast } from 'react-toastify'

import { CreateDeckArgs, ErrorResponse, useCreateDeckMutation } from '../../services'

export const useCreateNewDeck = (clearFilters: () => void) => {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [createDeck, { isLoading: creatingDeck }] = useCreateDeckMutation()

  const onCancelCreateDeck = () => {
    setShowCreateModal(false)
  }

  const handleCreateDeck = async (data: CreateDeckArgs) => {
    try {
      await createDeck(data).unwrap()
      debugger
      setShowCreateModal(false)
      clearFilters()
    } catch (e) {
      const error = e as ErrorResponse

      toast.error(error.data?.errorMessages[0].message ?? 'Failed to create a new deck')
    }
  }

  return { creatingDeck, handleCreateDeck, onCancelCreateDeck, setShowCreateModal, showCreateModal }
}
