import type { Meta, StoryObj } from '@storybook/react'

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
    email: 'XXXXXXXXXXXX',
    name: 'John Doe',
    photo: '../../../assets/icons/ellipse.png',
    photoDesc: 'Photo',
    profilePageHref: '#',
  },
}
