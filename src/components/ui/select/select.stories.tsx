import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '../typography'
import { Select } from './select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'select-box',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'select-fruit',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'select-box',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'select-fruit',
  },
}

export const Small: Story = {
  args: {
    options: [
      { label: '10', value: '10' },
      { label: '20', value: '20' },
      { label: '50', value: '50' },
    ],
    variant: 'small',
  },
  render: args => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
      <Typography as={'label'} variant={'body2'}>
        Show
      </Typography>

      <Select {...args} />

      <Typography as={'label'} variant={'body2'}>
        items per page
      </Typography>
    </div>
  ),
}
