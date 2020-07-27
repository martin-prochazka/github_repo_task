import React from 'react'
import { render } from '@testing-library/react'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'
import { Provider } from 'react-redux'
import { store } from 'store'

const theme = createMuiTheme()

const AllTheProviders: React.FC = ({ children }) => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Provider store={store}>{children}</Provider>
	</ThemeProvider>
)

const customRender = (ui: React.ReactElement) =>
	render(ui, { wrapper: AllTheProviders })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
