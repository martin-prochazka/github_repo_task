import { createNextState } from '@reduxjs/toolkit'
import * as api from 'repositories/api'
import {
	fetchRepositories,
	initialState,
	repositoryAdapter,
	repositorySlice,
} from 'repositories/slice'
import { store } from 'store'
import {
	getGitHubLastWeekRepositoriesMock,
	mockedRepositoryModels,
} from 'test-utils/mocks/repositoryMocks'

jest.mock('repositories/api')
const mock = jest.spyOn(api, 'getGitHubLastWeekRepositories')
mock.mockImplementation(getGitHubLastWeekRepositoriesMock)

describe('repositories/slice', () => {
	const { actions } = repositorySlice
	const { getState, dispatch } = store

	beforeEach(() => {
		dispatch(actions.clear())
	})

	it('should have initial state', () => {
		expect(getState().repos).toEqual(initialState)
	})

	it('should add and remove star', () => {
		expect(getState().repos.starred).toEqual([])

		dispatch(actions.addStar(111))

		expect(getState().repos.starred).toEqual([111])

		dispatch(actions.removeStar(111))

		expect(getState().repos.starred).toEqual([])
	})

	it('should set filter', () => {
		expect(getState().repos.filter).toEqual({ isStarred: false })

		dispatch(actions.setFilter({ isStarred: true }))

		expect(getState().repos.filter).toEqual({ isStarred: true })
	})

	it('should fetch mocked repositories', async () => {
		expect(getState().repos.repositories).toEqual(
			repositoryAdapter.getInitialState()
		)

		await dispatch(fetchRepositories())

		const expectedState = createNextState(
			getState().repos.repositories,
			repositories => {
				repositoryAdapter.setAll(repositories, mockedRepositoryModels)
			}
		)

		expect(getState().repos.repositories).toEqual(expectedState)
	})
})
