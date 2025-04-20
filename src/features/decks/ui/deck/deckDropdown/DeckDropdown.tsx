import { useNavigate } from 'react-router-dom'

import {
  Edit2Outline,
  MoreVerticalOutline,
  PlayCircleOutline,
  TrashOutline,
} from '@/assets/icons/components'
import { DropdownMenu, DropdownSeparator } from '@/common/components/dropdown'
import { DropdownMenuItem } from '@/common/components/dropdown/dropdownItem/DropdownMenuItem'
import { DefaultDescription } from '@/common/components/dropdown/dropdownItem/defaultDescription/DefaultDescription'
import { path } from '@/common/enums'

import s from './deckDropdown.module.scss'

export type DeckDropdownProps = {
  deckId?: string | undefined
  onDeleteDeck?: () => void
  onEditDeck?: () => void
}

export const DeckDropdown = ({ deckId, onDeleteDeck, onEditDeck }: DeckDropdownProps) => {
  const navigate = useNavigate()

  const onLearnDeck = () => {
    navigate(`${path.decks}/${deckId}/learn`)
  }

  return (
    <DropdownMenu trigger={<MoreVerticalOutline className={s.iconMenu} />}>
      <DropdownMenuItem className={s.menuItem} onSelect={onLearnDeck}>
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
