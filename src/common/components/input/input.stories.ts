import { Meta, StoryObj } from '@storybook/react'

import { Input } from './Input'

const meta = {
  component: Input,
  tags: ['autodocs'],
  title: 'Components/Input',
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    error: false,
    label: 'Input',
    placeholder: 'Input',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    error: false,
    label: 'Input',
    placeholder: 'Input',
    type: 'password',
    variant: 'secondary',
  },
}

export const SecondaryInputSearch: Story = {
  args: {
    error: false,
    label: 'Input',
    placeholder: 'Input search',
    variant: 'secondary',
  },
}

export const ErrorInputPrimary: Story = {
  args: {
    error: 'Error',
    label: 'Input',
    placeholder: 'Error',
    variant: 'primary',
  },
}
