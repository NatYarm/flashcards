import { useState } from 'react'

import { Meta, StoryObj } from '@storybook/react'

import { Select } from './Select'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'small'],
      description: 'The size variant of the select component',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    label: {
      control: 'text',
      description: 'Label for the select component',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    options: {
      control: 'object',
      description: 'Array of options for the select',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// Wrapper component to manage state
const SelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '')

  return (
    <Select
      {...args}
      value={value}
      onValueChange={newValue => {
        setValue(newValue)
        args.onValueChange?.(newValue)
      }}
    />
  )
}

export const Default: Story = {
  render: args => <SelectWrapper {...args} />,
  args: {
    label: 'Select a fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'Choose a fruit',
    onValueChange: value => console.log('Selected value:', value),
    value: '',
  },
}

export const WithPreselectedValue: Story = {
  render: args => <SelectWrapper {...args} />,
  args: {
    label: 'Select a fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'Choose a fruit',
    onValueChange: value => console.log('Selected value:', value),
    value: 'banana',
  },
}

export const Small: Story = {
  render: args => <SelectWrapper {...args} />,
  args: {
    label: 'Select a fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'Choose a fruit',
    onValueChange: value => console.log('Selected value:', value),
    value: '',
    variant: 'small',
  },
}

export const Disabled: Story = {
  render: args => <SelectWrapper {...args} />,
  args: {
    label: 'Select a fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'Choose a fruit',
    onValueChange: value => console.log('Selected value:', value),
    value: '',
    disabled: true,
  },
}

export const ManyOptions: Story = {
  render: args => <SelectWrapper {...args} />,
  args: {
    label: 'Select a fruit',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Blueberry', value: 'blueberry' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Grapes', value: 'grapes' },
      { label: 'Lemon', value: 'lemon' },
      { label: 'Mango', value: 'mango' },
      { label: 'Orange', value: 'orange' },
      { label: 'Peach', value: 'peach' },
      { label: 'Pear', value: 'pear' },
      { label: 'Pineapple', value: 'pineapple' },
      { label: 'Strawberry', value: 'strawberry' },
      { label: 'Watermelon', value: 'watermelon' },
    ],
    placeholder: 'Choose a fruit',
    onValueChange: value => console.log('Selected value:', value),
    value: '',
  },
}
