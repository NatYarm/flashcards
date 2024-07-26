import { useState } from 'react'
import { toast } from 'react-toastify'

import { ErrorResponse } from '@/common/types'
import { useDeleteDeckMutation } from '@/features/decks/services'

export const useDeleteDeck = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteDeck, { isLoading: isLoadingDeleteDeck }] = useDeleteDeckMutation()
  const [deckToDeleteId, setDeckToDeleteId] = useState<null | string>(null)
  const [deckName, setDeckName] = useState<null | string>(null)

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
    } catch (e) {
      const error = e as ErrorResponse

      toast.error(error.data?.errorMessages[0].message ?? 'Deck delete failed')
    }
  }

  return {
    deckName,
    deckToDeleteId,
    handleDeckDelete,
    isDeleteModalOpen,
    isLoadingDeleteDeck,
    onCancelDelete,
    onDeleteClick,
    setIsDeleteModalOpen,
  }
}
