import { useState } from 'react'
import { toast } from 'react-toastify'

import { Deck, ErrorResponse } from '@/common/types'
import { useUpdateDeckMutation } from '@/features/decks/services'

import { DeckModalFormValues } from '../DeckModal'

export const useUpdateDeck = (clearFilters: () => void) => {
  /*const [updateModalDeck, setUpdateModalDeck] = useState(false)*/
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deckToEdit, setDeckToEdit] = useState<Deck | null>(null)
  const [updateDeck, { isLoading: isLoadingUpdateDeck }] = useUpdateDeckMutation()

  const onEditClick = (deck: Deck) => {
    setDeckToEdit(deck)
    setIsEditModalOpen(true)
  }

  const onCancelUpdateDeck = () => {
    setIsEditModalOpen(false)
  }

  /*const requestUpdateDeck = async (args: UpdateDeckArgs) => {
    try {
      await updateDeck(args).unwrap()
      toast.success('Card Update')
    } catch (e) {
      const error = e as ErrorResponseField

      toast.error(error.data.message ?? 'Update Card failed')
    } finally {
      setUpdateModalDeck(false)
    }
  }*/

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
    isLoadingUpdateDeck,
    onCancelUpdateDeck,
    onEditClick,
    /*requestUpdateDeck,*/
    setDeckToEdit,
    setIsEditModalOpen,
    /*setUpdateModalDeck,*/
    /*updateModalDeck,*/
  }
}
