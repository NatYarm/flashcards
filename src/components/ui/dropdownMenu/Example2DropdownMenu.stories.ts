import type { Meta, StoryObj } from '@storybook/react'

import { Example2DropDown } from './Example2DropDown'

const meta = {
  component: Example2DropDown,
  tags: ['autodocs'],
  title: 'Components/Example2DropDown',
} satisfies Meta<typeof Example2DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
