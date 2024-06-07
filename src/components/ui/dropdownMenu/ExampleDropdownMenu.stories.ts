import type { Meta, StoryObj } from '@storybook/react'

import UserPhoto from '../../../assets/icons/ellipse.png'
import { ExampleDropDown } from './ExampleDropDown'

const meta = {
  component: ExampleDropDown,
  tags: ['autodocs'],
  title: 'Components/ExampleDropDown',
} satisfies Meta<typeof ExampleDropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    email: 'gds@ewerw.coom',
    name: 'John Doe',
    photo: UserPhoto,
    profilePageHref: '#',
  },
}
