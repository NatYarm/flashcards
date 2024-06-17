import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '.'

const meta = {
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: [
        'div',
        'h1',
        'h2',
        'h3',
        'h4',
        'body1',
        'body2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
        'error',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    children: 'H1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: 'H2',
    variant: 'h2',
  },
}
export const H3: Story = {
  args: {
    children: 'H3',
    variant: 'h3',
  },
}
export const H4: Story = {
  args: {
    children: 'H4',
    variant: 'h4',
  },
}

export const Caption: Story = {
  args: {
    children: 'Caption',
    variant: 'caption',
  },
}

export const Body1: Story = {
  args: {
    children: 'Body1',
    variant: 'body1',
  },
}

export const Body2: Story = {
  args: {
    children: 'Body2',
    variant: 'body2',
  },
}

export const Overline: Story = {
  args: {
    children: 'Overline',
    variant: 'overline',
  },
}

export const Subtitle1: Story = {
  args: {
    children: 'Subtitle1',
    variant: 'subtitle1',
  },
}

export const Subtitle2: Story = {
  args: {
    children: 'Subtitle2',
    variant: 'subtitle2',
  },
}

export const Link1: Story = {
  args: {
    children: 'Link1',
    variant: 'link1',
  },
}

export const Link2: Story = {
  args: {
    children: 'Link2',
    variant: 'link2',
  },
}

export const Error: Story = {
  args: {
    children: 'Error',
    variant: 'error',
  },
}
