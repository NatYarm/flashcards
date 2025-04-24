import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { themes } from '@storybook/theming'
import type { Decorator, Preview } from '@storybook/react'
import '../src/styles/index.scss'

const withRouter: Decorator = Story => (
  <MemoryRouter initialEntries={['/']}>
    <Story />
  </MemoryRouter>
)

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      theme: themes.dark,
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#000000',
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withRouter],
  tags: ['autodocs'],
}

export default preview
