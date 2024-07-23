import { useState } from 'react'
import { toast } from 'react-toastify'

import { Deck, ErrorResponse, useUpdateDeckMutation } from '@/features/decks/services'

import { DeckModalFormValues } from '../DeckModal'

export const useUpdateDeck = (clearFilters: () => void) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null)
  const [updateDeck, { isLoading: updatingDeck }] = useUpdateDeckMutation()

  const onEditClick = (deck: Deck) => {
    setDeckToEdit(deck)
    setIsEditModalOpen(true)
  }

  const onCancelUpdateDeck = () => {
    setIsEditModalOpen(false)
  }

  const handleDeckUpdate = async (data: DeckModalFormValues) => {
    if (deckToEdit) {
      try {
        await updateDeck({ id: deckToEdit.id, ...data }).unwrap()
        setIsEditModalOpen(false)
        setDeckToEdit(null)
        clearFilters()
      } catch (e) {
        const error = e as ErrorResponse

        toast.error(error.data?.errorMessages[0].message ?? 'Deck update failed')
      }
    }
  }

  return {
    deckToEdit,
    handleDeckUpdate,
    isEditModalOpen,
    onCancelUpdateDeck,
    onEditClick,
    setDeckToEdit,
    setIsEditModalOpen,
    updatingDeck,
  }
}
