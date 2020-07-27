import { getGitHubRepositoriesMock } from '../fixtures/repository'

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
		cy.get('[data-test-id=repository-box]').should(
			'have.length',
			repositoryMock.items.length
		)

		cy.get('[data-test-id=star-switch]').last().click()

		cy.get('[data-test-id=filter-stared-switch]').click()

		cy.get('[data-test-id=repository-box]').should('have.length', 1)
	})
})
