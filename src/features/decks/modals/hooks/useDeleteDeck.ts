import { useState } from 'react'
import { toast } from 'react-toastify'

import { ErrorResponse, useDecksSearchParams, useDeleteDeckMutation } from '../../services'

export const useDeleteDeck = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteDeck, { isLoading: deletingDeck }] = useDeleteDeckMutation()
  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckName, setDeckName] = useState<null | string>(null)

  const { clearFilters } = useDecksSearchParams()

  const onDeleteClick = (id: string, deckName: string) => {
    setIsDeleteModalOpen(true)
    setDeckToDeleteId(id)
    setDeckName(deckName)
  }

  const onCancelDelete = () => {
    setDeckToDeleteId(null)
    setIsDeleteModalOpen(false)
  }

  const handleDeckDelete = async () => {
    try {
      await deleteDeck({ id: deckToDeleteId ?? '' }).unwrap()
      setIsDeleteModalOpen(false)
      setDeckToDeleteId(null)
      clearFilters()
    } catch (e) {
      const error = e as ErrorResponse

      toast.error(error.data?.errorMessages[0].message ?? 'Deck delete failed')
    }
  }

  return {
    deckName,
    deckToDeleteId,
    deletingDeck,
    handleDeckDelete,
    isDeleteModalOpen,
    onCancelDelete,
    onDeleteClick,
    setIsDeleteModalOpen,
  }
}
