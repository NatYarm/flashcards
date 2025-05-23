import { path } from '@/common/enums'
import { Error } from '@/features/error/Error'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Error,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Features/Error',
} satisfies Meta<typeof Error>

export default meta
type Story = StoryObj<typeof Error>

export const DefaultError: Story = {
  name: 'Default',
  args: {},

  parameters: {
    memoryRouter: {
      initialEntries: [path.error],
    },
  },
}
