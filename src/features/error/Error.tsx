import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Button, Page, Typography } from '@/common/components'
import { path } from '@/common/enums'
import { clsx } from 'clsx'

import s from '@/features/error/error.module.scss'

import Error404 from '../../assets/img/Error404.png'
export default {}
type ErrorProps = ComponentPropsWithoutRef<'div'>

export const Error = forwardRef<ElementRef<'div'>, ErrorProps>((props, ref) => {
  const { className, ...rest } = props

  return (
    <Page>
      <div className={clsx(s.container, className)} {...rest} ref={ref}>
        <img alt={'Error'} src={Error404} />
        <Typography as={'h2'} variant={'body1'}>
          Sorry! Page not found!
        </Typography>
        <Button as={'a'} href={path.base}>
          Back to home page
        </Button>
      </div>
    </Page>
  )
})

Error.displayName = 'Error'
