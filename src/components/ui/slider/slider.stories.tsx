import type { Meta, StoryObj } from '@storybook/react'

import { Slider } from './index'
import { useState } from 'react'

const meta = {
  component: Slider,
  parameters: {},
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  
  args: { value: [0, 50], max: 50, },
  render: args => {
    
    const [sliderRange, setSliderRange] = useState([0,50])

   
    return (<Slider {...args} value={sliderRange} onValueChange={setSliderRange}/>
  )}
}
