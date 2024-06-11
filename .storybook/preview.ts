import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'
import '../src/styles/index.scss'
import { themes } from '@storybook/theming'
import type { Preview } from '@storybook/react'
import { reactRouterParameters, withRouter } from 'storybook-addon-react-router-v6'
 
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    reactRouter: reactRouterParameters({
      routing: {
        handle: 'Nav',
        path: '*',
      },
    }),
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

  tags: ['autodocs']
}

export const decorators = [withRouter]
export default preview
