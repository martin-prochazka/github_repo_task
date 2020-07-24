import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

describe('App', () => {
	it('should render task', () => {
		const { getByText } = render(<App />)
		const linkElement = getByText(/task/i)
		expect(linkElement).toBeInTheDocument()
	})
})
