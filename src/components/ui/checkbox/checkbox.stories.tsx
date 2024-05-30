import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './checkbox'

const meta = {
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
    required: { control: 'boolean' },
  },
  component: Checkbox,
  tags: ['autodocs'],
  title: 'Components/Checkbox',
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Check-box',
  },
}

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
}

export const DisabledUnchecked: Story = {
  args: {
    checked: false,
    disabled: true,
    label: 'Check-box',
  },
}

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    label: 'Check-box',
  },
}

export const Hover: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Check-box',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const HoverChecked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Check-box',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const FocusChecked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Active: Story = {
  args: {
    checked: false,
    disabled: false,
    label: 'Check-box',
  },
  parameters: {
    pseudo: { active: true },
  },
}

export const ActiveChecked: Story = {
  args: {
    checked: true,
    disabled: false,
    label: 'Check-box',
  },
  parameters: {
    pseudo: { active: true },
  },
}
