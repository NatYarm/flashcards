import { Meta, StoryObj } from '@storybook/react'

import { RadioGroupComponent } from './RadioGroupComponent'

const meta = {
  component: RadioGroupComponent,
  tags: ['autodocs'],
  title: 'Components/radioGroup',
} satisfies Meta<typeof RadioGroupComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: 'test',
    label: 'Label Group',
    radioGroupItems: [
      {
        id: '1234',
        value: 'test',
      },
      {
        id: '12341234',
        value: 'seconde',
      },
    ],
    vertical: true,
  },
}
