import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from './Slider'

const meta = {
  component: Slider,
  parameters: {},
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { max: 50, value: [0, 50] },
  render: args => {
    const [sliderRange, setSliderRange] = useState([0, 50])

    return <Slider {...args} onValueChange={setSliderRange} value={sliderRange} />
  },
}
