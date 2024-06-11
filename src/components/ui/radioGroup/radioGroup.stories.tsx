import { Meta, StoryObj } from '@storybook/react'

import { RadioGroup } from './radioGroup'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/radioGroup',
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      {
        label: 'option1',
        value: 'option1',
      },
      {
        label: 'option2',
        value: 'option2',
      },
    ],
  },
}
export const Horizontal: Story = {
  args: {
    items: [
      {
        label: 'option1',
        value: 'horizontal1',
      },
      {
        label: 'option2',
        value: 'horizontal2',
      },
    ],
    orientation: 'horizontal',
  },
}
export const Disabled: Story = {
  args: {
    items: [
      {
        label: 'option3',
        value: 'option3',
      },
      {
        disabled: true,
        label: 'option4',
        value: 'option4',
      },
    ],
    orientation: 'horizontal',
  },
}
