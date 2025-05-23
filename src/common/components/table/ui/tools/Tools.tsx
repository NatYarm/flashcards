import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Link } from 'react-router-dom'

import { Edit2Outline, PlayCircleOutline, TrashOutline } from '@/assets/icons/components'
import { clsx } from 'clsx'

import s from './tools.module.scss'

type ToolsProps = {
  canUsePlay?: boolean
  canUseTool?: boolean
  id: string
  onDelete?: (id: string) => void
  onEdit?: (id: string) => void
} & ComponentPropsWithoutRef<'div'>
export const Tools = forwardRef<ElementRef<'div'>, ToolsProps>(
  (
    { canUsePlay = true, canUseTool = true, className, id, onDelete, onEdit, onPlay, ...rest },
    ref
  ) => {
    return (
      <div className={clsx(s.container, className)} ref={ref} {...rest}>
        {canUsePlay && (
          <Link className={s.button} to={`/decks/${id}/learn`}>
            <PlayCircleOutline className={s.icon} />
          </Link>
        )}
        {canUseTool && (
          <>
            <button type={'button'} className={s.button} onClick={() => onEdit?.(id)}>
              <Edit2Outline className={s.icon} />
            </button>
            <button type={'button'} className={s.button} onClick={() => onDelete?.(id)}>
              <TrashOutline className={s.icon} />
            </button>
          </>
        )}
      </div>
    )
  }
)

Tools.displayName = 'Tools'
