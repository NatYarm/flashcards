import { useState } from 'react'
import { toast } from 'react-toastify'

import { ErrorResponse, UpdateDeckArgs, useUpdateDeckMutation } from '../../services'

export const useUpdateDeck = () => {
  const [showEditModal, setShowEditModal] = useState(false)

  const [updateDeck] = useUpdateDeckMutation()

  const requestUpdateDeck = async (args: UpdateDeckArgs) => {
    try {
      await updateDeck(args).unwrap()
    } catch (e) {
      console.error(e)
    } finally {
      setShowEditModal(false)
    }
  }

  return { requestUpdateDeck, setShowEditModal, showEditModal, updateDeck }
}
