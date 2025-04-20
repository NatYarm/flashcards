import type { Meta, StoryObj } from '@storybook/react'

import { NewPasswordForm } from '@/features/auth/newPassword/NewPasswordForm'

const meta = {
  component: NewPasswordForm,
  tags: ['autodocs'],
  title: 'Auth/NewPassword',
} satisfies Meta<typeof NewPasswordForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (data: any) => console.info(data),
  },
}
