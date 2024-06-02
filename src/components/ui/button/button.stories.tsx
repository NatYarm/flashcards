import type { Meta, StoryObj } from '@storybook/react'

import { LogOut } from '@/assets/icons/components'

import { Button } from './button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    fullWidth: true,
    variant: 'primary',
  },
}

export const IconButton: Story = {
  args: {
    children: (
      <>
        <LogOut />
        Button
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}

export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary',
  },
}

export const AsLink2: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    variant: 'primary',
  },
}
