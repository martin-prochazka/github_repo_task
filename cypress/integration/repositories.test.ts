import { getGitHubRepositoriesMock } from '../fixtures/repositoryMocks'

describe('repositories', () => {
	const repositoryMock = getGitHubRepositoriesMock()

	beforeEach(() => {
		cy.server()
			.route(
				'https://api.github.com/search/repositories*',
				repositoryMock
			)
			.visit('http://localhost:3000/')
	})

	it('should show only starred repos', () => {
		cy.get('[data-testid=repository-box]').should(
			'have.length',
			repositoryMock.items.length
		)

		cy.get('[data-testid=star-switch]').last().click()

		cy.get('[data-testid=filter-stared-switch]').click()

		cy.get('[data-testid=repository-box]').should('have.length', 1)
	})
})
