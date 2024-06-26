import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@/common/components/typography'

import { Card } from './Card'

const meta = {
  component: Card,
  tags: ['autodocs'],
  title: 'Components/Card',
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <Typography variant={'large'}>Card</Typography>,
    style: {
      height: '500px',
      width: '400px',
    },
  },
}
