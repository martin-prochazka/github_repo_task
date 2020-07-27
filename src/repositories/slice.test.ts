import {
	repositorySlice,
	initialState,
	fetchRepositories,
	RepositoryModel,
	repositoryAdapter,
} from 'repositories/slice'
import { store } from 'store'
import * as api from 'repositories/api'

jest.mock('repositories/api')
const mock = jest.spyOn(api, 'getGitHubLastWeekRepositories')

const mockedGitHubRepositories = [
	{
		id: 1,
		name: 'repository 1',
		description: 'description 1',
		html_url: 'https://github.com/owner1/repository1',
		stargazers_count: 111,
	},
	{
		id: 2,
		name: 'repository 2',
		description: 'description 2',
		html_url: 'https://github.com/owner2/repository2',
		stargazers_count: 222,
	},
	{
		id: 3,
		name: 'repository 3',
		description: 'description 3',
		html_url: 'https://github.com/owner3/repository3',
		stargazers_count: 333,
	},
]

const getGitHubLastWeekRepositoriesMock = async (): Promise<{ data: any }> => {
	return Promise.resolve({
		data: {
			items: mockedGitHubRepositories,
		},
	})
}

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

	it('should fetch mocked repositories', () => {
		expect(getState().repos.repositories).toEqual(
			repositoryAdapter.getInitialState()
		)

		dispatch(fetchRepositories())

		const expectedRepositoryModels: RepositoryModel[] = [
			{
				id: 1,
				name: 'repository 1',
				description: 'description 1',
				link: 'https://github.com/owner1/repository1',
				stars: 111,
			},
			{
				id: 2,
				name: 'repository 2',
				description: 'description 2',
				link: 'https://github.com/owner2/repository2',
				stars: 222,
			},
			{
				id: 3,
				name: 'repository 3',
				description: 'description 3',
				link: 'https://github.com/owner3/repository3',
				stars: 333,
			},
		]

		const expectedState = getState().repos.repositories
		repositoryAdapter.setAll(expectedState, expectedRepositoryModels)

		expect(getState().repos.repositories).toEqual(expectedState)
	})
})
