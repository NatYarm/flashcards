import type { Meta, StoryObj } from '@storybook/react'

import { DropdownMenuComponent } from './DropdownMenuComponent'

const meta = {
  component: DropdownMenuComponent,
  tags: ['autodocs'],
  title: 'Components/DropdownMenuComponent',
} satisfies Meta<typeof DropdownMenuComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
