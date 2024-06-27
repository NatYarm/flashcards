import { useState } from 'react'
import { toast } from 'react-toastify'

import { CreateDeckArgs, useCreateDeckMutation, useDecksSearchParams } from '../../services'

export const useCreateNewDeck = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { clearFilters } = useDecksSearchParams()

  const [createDeck, { isLoading: creatingDeck }] = useCreateDeckMutation()

  const handleCreateDeck = (data: CreateDeckArgs) => {
    createDeck(data)
    clearFilters()
    toast.success('Deck created')
  }

  return { creatingDeck, handleCreateDeck, setShowCreateModal, showCreateModal }
}
