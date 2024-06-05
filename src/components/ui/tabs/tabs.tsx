import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as RadixTabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from './tabs.module.scss'

import { Typography } from '../typography'

type Tab = {
  disabled?: boolean
  title: string
  /** A unique value that associates the trigger with a content. */
  value: string
}

type TabsProps = {
  className?: string
  defaultValue?: string
  label?: string
  orientation?: 'horizontal' | 'vertical'
  tabs: Tab[]
} & ComponentPropsWithoutRef<typeof RadixTabs.Root>

export const Tabs = ({
  children,
  className,
  defaultValue,
  label,
  orientation = 'horizontal',
  tabs,
  ...rest
}: TabsProps) => {
  return (
    <div>
      {label && (
        <Typography as={'label'} variant={'body2'}>
          {label}
        </Typography>
      )}
      <RadixTabs.Root
        className={s.root}
        defaultValue={defaultValue}
        orientation={orientation}
        {...rest}
      >
        <RadixTabs.List className={s.tabsList}>
          {tabs.map(tab => (
            <RadixTabs.Trigger
              className={clsx(s.tabTrigger, className)}
              disabled={tab.disabled}
              key={tab.value}
              value={tab.value}
            >
              {tab.title}
            </RadixTabs.Trigger>
          ))}
        </RadixTabs.List>
      </RadixTabs.Root>
    </div>
  )
}

export type TabContentProps = {
  children: ReactNode
  /** A unique value that associates the trigger with a content. */
  value: string
}

export const TabContent = ({ children, value }: TabContentProps) => {
  return (
    <RadixTabs.Content className={s.content} value={value}>
      {children}
    </RadixTabs.Content>
  )
}
