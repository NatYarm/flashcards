import type { Meta, StoryObj } from '@storybook/react'

import { RecoveryPassword } from '@/components/auth/recovery-password/recovery-password'

const meta = {
  component: RecoveryPassword,
  tags: ['autodocs'],
  title: 'Auth/RecoveryPassword',
} satisfies Meta<typeof RecoveryPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    onSubmit: data => console.info(data),
  },
}
