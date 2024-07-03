import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from './'

const meta = {
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Profile/Personal information',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    email: 'your_email@domain.com',
    img: 'https://picsum.photos/200',
    name: 'John Doe',
  },
}
