import type { Meta, StoryObj } from '@storybook/react'

import { LogOut, MoreVerticalOutline, PersonOutline } from '@/assets/icons/components'

import { Avatar } from '../avatar/Avatar'
import { DropdownMenu, DropdownMenuLabel, DropdownSeparator } from './DropdownMenu'
import { DropdownMenuItem } from './dropdownItem/DropdownMenuItem'

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

export const HeaderDropdown: Story = {
  args: {},
  render: () => (
    <DropdownMenu trigger={<Avatar src={'https://avatars.githubusercontent.com/u/1196875?v=4'} />}>
      <DropdownMenuLabel>Info</DropdownMenuLabel>
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
