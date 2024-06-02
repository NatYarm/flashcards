import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../src/styles/index.scss'
<<<<<<< HEAD
import { themes } from '@storybook/theming'

=======
 
import { themes } from '@storybook/theming'
import type { Preview } from '@storybook/react'
 
>>>>>>> 37d4cfb1c08411463195afd61ce5a962862991e3
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
}

export default preview
