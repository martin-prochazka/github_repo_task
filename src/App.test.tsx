import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

describe('App', () => {
	it('should render Repositories', () => {
		const { getByText } = render(<App />)
		const repositoriesElement = getByText(/repositories/i)
		expect(repositoriesElement).toBeInTheDocument()
	})
})
