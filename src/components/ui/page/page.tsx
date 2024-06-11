import { CSSProperties, ComponentPropsWithoutRef } from 'react'

import clsx from 'clsx'

import s from './page.module.scss'

type Props = {
  mt?: CSSProperties['marginTop']
} & ComponentPropsWithoutRef<'div'>

export const Page = ({ className, mt = '36px', style, ...rest }: Props) => {
  const classNames = clsx(s.container, className)
  const styles: CSSProperties = { marginTop: mt, ...style }

  return <div className={classNames} style={styles} {...rest} />
}
