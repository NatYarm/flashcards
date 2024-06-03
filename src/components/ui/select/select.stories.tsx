import type { Meta, StoryObj } from '@storybook/react'

import s from './select.module.scss'

import { Typography } from '../typography'
import { Select } from './select'
import { SelectItem } from './selectItem'

const meta = {
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'select-box',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'select-fruit',
  },
  render: ({ label, options, placeholder }) => (
    <>
      <Typography as={'label'} className={s.selectLabel} variant={'body2'}>
        {label}
      </Typography>
      <Select options={options} placeholder={placeholder}>
        {options.map((opt, idx) => (
          <SelectItem key={idx} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </>
  ),
}

export const Disabled: Story = {
  args: {
    label: 'select-box',
    options: [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Grapes', value: 'grapes' },
    ],
    placeholder: 'select-fruit',
  },
  render: ({ label, options, placeholder }) => (
    <>
      <Typography as={'label'} className={s.disabledSelectLabel} variant={'body2'}>
        {label}
      </Typography>
      <Select disabled options={options} placeholder={placeholder}>
        {options.map((opt, idx) => (
          <SelectItem key={idx} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </>
  ),
}

export const Small: Story = {
  args: {
    options: [
      { label: 10, value: '10' },
      { label: 20, value: '20' },
      { label: 50, value: '50' },
    ],
    variant: 'small',
  },
  render: ({ options }) => (
    <div style={{ alignItems: 'center', display: 'flex', gap: '5px' }}>
      <Typography as={'label'} variant={'body2'}>
        Show
      </Typography>

      <Select className={s.selectSize} options={options} variant={'small'}>
        {options.map((opt, idx) => (
          <SelectItem key={idx} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>

      <Typography as={'label'} variant={'body2'}>
        items per page
      </Typography>
    </div>
  ),
}
