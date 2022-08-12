// .storybook/preview.js
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '../styles/global.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
}
