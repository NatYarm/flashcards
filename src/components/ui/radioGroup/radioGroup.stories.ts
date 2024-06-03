import { Meta, StoryObj } from '@storybook/react'

import { RadioGroupDemo } from './radioGroup'

const meta = {
  component: RadioGroupDemo,
  tags: ['autodocs'],
  title: 'Components/radioGroup',
} satisfies Meta<typeof RadioGroupDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
}
