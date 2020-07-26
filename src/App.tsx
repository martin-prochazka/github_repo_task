import React from 'react'
import { Provider } from 'react-redux'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { store } from 'store'
import { Repositories } from 'repositories/components/Repositories'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme()

export const App: React.FC = () => (
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<Provider store={store}>
			<Repositories />
		</Provider>
	</ThemeProvider>
)
