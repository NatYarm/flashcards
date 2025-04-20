import { Button, Modal, ModalProps, Typography } from '@/common/components'

import s from './deleteDeckModal.module.scss'

type Props = {
  deckName: string
} & Pick<ModalProps, 'onCancel' | 'onConfirm' | 'onOpenChange' | 'open'>

export const DeleteDeckModal = ({ deckName, onCancel, onConfirm, ...modalProps }: Props) => {
  return (
    <Modal onCancel={onCancel} onConfirm={onConfirm} title={'Delete Deck'} {...modalProps}>
      <Typography>
        Do you really want to delete <strong>{deckName}</strong>?
      </Typography>
      <Typography>All cards will be deleted.</Typography>
      <div className={s.buttonsContainer}>
        <Button onClick={() => modalProps.onOpenChange?.(false)} variant={'secondary'}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Delete Deck</Button>
      </div>
    </Modal>
  )
}
