import { useNavigate } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { Avatar } from '@/common/components/avatar'
import { DropdownMenu, DropdownSeparator } from '@/common/components/dropdown'
import { DropdownMenuItem } from '@/common/components/dropdown/dropdownItem/DropdownMenuItem'
import { DefaultDescription } from '@/common/components/dropdown/dropdownItem/defaultDescription/DefaultDescription'
import { UserDropdownTrigger } from '@/common/components/dropdown/userDropdown/userDropdownTrigger/UserDropdownTrigger'
import { path } from '@/common/enums'

import s from './deckDropdown.module.scss'

export type DeckDropdownProps = {
  avatar?: string
  deckId?: string | undefined
  onDeleteDeck?: () => void
  onEditDeck?: () => void
}

export const DeckDropdown = ({
  avatar = '',
  deckId,
  onDeleteDeck,
  onEditDeck,
}: DeckDropdownProps) => {
  const navigate = useNavigate()

  const onLearnDeck = () => {
    navigate(`${path.decks}/${deckId}/learn`)
  }

  return (
    <DropdownMenu trigger={<UserDropdownTrigger src={avatar} />}>
      <DropdownMenuItem>
        <Avatar src={avatar} />
      </DropdownMenuItem>

      <DropdownSeparator />
      <DropdownMenuItem onSelect={onLearnDeck}>
        <PlayCircleOutline className={s.icon} />
        <DefaultDescription text={'Learn'} />
      </DropdownMenuItem>

      <DropdownSeparator />
      <DropdownMenuItem onSelect={onEditDeck}>
        <Edit2Outline className={s.icon} />
        <DefaultDescription text={'Edit'} />
      </DropdownMenuItem>

      <DropdownSeparator />
      <DropdownMenuItem onSelect={onDeleteDeck}>
        <TrashOutline className={s.icon} />
        <DefaultDescription text={'Delete'} />
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

DeckDropdown.displayName = 'DeckDropdown'
