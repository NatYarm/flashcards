import type { Meta, StoryObj } from '@storybook/react'

import s from './select.module.scss'

import { Typography } from '../typography'
import { Select } from './select'
import { SelectItem } from './selectItem'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <>
      <Typography as={'label'} className={s.selectLabel} variant={'body2'}>
        select-box
      </Typography>
      <Select className={s.selectSize} placeholder={'select-box'}>
        <SelectItem value={'apple'}>Apple</SelectItem>
        <SelectItem value={'banana'}>Banana</SelectItem>
        <SelectItem value={'grapes'}>Grapes</SelectItem>
      </Select>
    </>
  ),
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <>
      <Typography as={'label'} className={s.disabledSelectLabel} variant={'body2'}>
        select-box
      </Typography>
      <Select className={s.selectSize} disabled placeholder={'select-box'}>
        <SelectItem value={'apple'}>Apple</SelectItem>
        <SelectItem value={'banana'}>Banana</SelectItem>
        <SelectItem value={'grapes'}>Grapes</SelectItem>
      </Select>
    </>
  ),
}
