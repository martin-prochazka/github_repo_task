import React from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { Repositories } from 'repositories/components/Repositories'

export const App: React.FC = () => (
	<Provider store={store}>
		<Repositories />
	</Provider>
)
