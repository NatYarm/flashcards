import type { Meta, StoryObj } from '@storybook/react'

import { LogOut, MoreVerticalOutline, PersonOutline } from '@/assets/icons/components'
import UserPhoto from '@/assets/img/user-12.jpeg'

import { Button } from '../button'
import { DropdownMenu, DropdownSeparator } from './dropdownMenu'
import { DropdownMenuItem } from './dropdownMenuItem'

const meta = {
  component: DropdownMenu,
  tags: ['autodocs'],
  title: 'Components/DropdownMenu',
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {},
  render: () => (
    <DropdownMenu trigger={<MoreVerticalOutline />}>
      <DropdownMenuItem>
        <PersonOutline /> Profile
      </DropdownMenuItem>
      <DropdownSeparator />
      <DropdownMenuItem>
        <LogOut /> Logout
      </DropdownMenuItem>
      <DropdownSeparator />
    </DropdownMenu>
  ),
}
