import { useState } from 'react'
import { toast } from 'react-toastify'

import { ErrorResponseField, UpdateCardBody } from '@/common/types'
import { useUpdateCardMutation } from '@/features/cards/services'

export const useUpdateCard = () => {
  const [updateModal, setUpdateModal] = useState<boolean>(false)
  const [updateCard, { isLoading: isLoadingUpdateCard }] = useUpdateCardMutation()
  const [dataUpdateTable, setUpdateTable] = useState<UpdateCardBody>()
  const [dataIdTable, setIdTable] = useState<string>()
  const requestUpdate = async (args: UpdateCardBody) => {
    try {
      await updateCard({ ...args, id: dataIdTable ?? '' }).unwrap()
      toast.success('Card Update')
    } catch (e) {
      const error = e as ErrorResponseField

      toast.error(error.data.message ?? 'Update Card failed')
    } finally {
      setUpdateModal(false)
    }
  }

  return {
    dataUpdateTable,
    isLoadingUpdateCard,
    requestUpdate,
    setIdTable,
    setUpdateModal,
    setUpdateTable,
    updateModal,
  }
}
