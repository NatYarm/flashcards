import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Button } from '../button'
import { Modal } from './Modal'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Modal',
    onOpenChange: () => {},
    open: true,
    title: 'Modal title',
  },
  render: args => {
    const [open, setOpen] = useState(false)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} onOpenChange={setOpen} open={open}>
          Modal content
        </Modal>
      </>
    )
  },
}
