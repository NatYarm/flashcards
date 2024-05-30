import type { Meta, StoryObj } from '@storybook/react'

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
    <Select placeholder={'select-box'}>
      <SelectItem value={'apple'}>Apple</SelectItem>
      <SelectItem value={'banana'}>Banana</SelectItem>
      <SelectItem value={'grapes'}>Grapes</SelectItem>
    </Select>
  ),
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <Select disabled placeholder={'select-box'}>
      <SelectItem value={'apple'}>Apple</SelectItem>
      <SelectItem value={'banana'}>Banana</SelectItem>
      <SelectItem value={'grapes'}>Grapes</SelectItem>
    </Select>
  ),
}
