import React from 'react'
import { Repository } from 'repositories/components/Repository'
import { mockedRepositoryModels } from 'test-utils/mocks/repositoryMocks'
import { render, screen } from 'test-utils/test-utils'

describe('Repository', () => {
	const repository = mockedRepositoryModels[1]

	beforeEach(() => {
		render(<Repository repository={repository} />)
	})

	it('should render passed props', () => {
		expect(screen.getByTestId('repository-name')).toHaveTextContent(
			repository.name
		)
		expect(screen.getByTestId('repository-stars')).toHaveTextContent(
			repository.stars.toString()
		)
		expect(screen.getByTestId('repository-description')).toHaveTextContent(
			repository.description
		)
		expect(screen.getByTestId('repository-link')).toHaveTextContent(
			repository.link
		)
		expect(
			screen.getByTestId('repository-starred-label')
		).toHaveTextContent('Star this repo')
	})

	it('should change starred', async () => {
		expect(screen.getByRole('checkbox')).not.toBeChecked()
		expect(
			screen.getByTestId('repository-starred-label')
		).toHaveTextContent('Star this repo')

		screen.getByRole('checkbox').click()

		expect(
			await screen.findByTestId('repository-starred-label')
		).toHaveTextContent('Unstar this repo')
		expect(screen.getByRole('checkbox')).toBeChecked()
	})
})
