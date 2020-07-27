import { store } from 'store'
import {
	selectFilter,
	selectRepoSlice,
	selectStarredIds,
	selectIsLoading,
	selectRepositories,
	selectIsRepoStarred,
	selectFilteredRepositories,
} from 'repositories/selectors'
import { createNextState } from '@reduxjs/toolkit'
import {
	initialState,
	RepositoryModel,
	repositoryAdapter,
} from 'repositories/slice'

describe('repositories/selectors', () => {
	const { getState } = store

	const filterState = createNextState(getState(), state => {
		state.repos.filter = {
			isStarred: true,
		}
	})

	const starredState = createNextState(getState(), state => {
		state.repos.starred = [1]
	})

	const isLoadingState = createNextState(getState(), state => {
		state.repos.isLoading = true
	})

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

	const repositoryEntityState = createNextState(
		getState().repos.repositories,
		repositories => {
			repositoryAdapter.setAll(repositories, expectedRepositoryModels)
		}
	)

	const getRepositoriesState = ({ isLoading }: { isLoading: boolean }) =>
		createNextState(getState(), state => {
			state.repos.repositories = repositoryEntityState
			state.repos.isLoading = isLoading
		})

	const getFilteredRepositoriesState = ({
		isLoading,
		isStarred = false,
		starred = [],
	}: {
		isLoading: boolean
		isStarred?: boolean
		starred?: number[]
	}) =>
		createNextState(getState(), state => {
			state.repos.repositories = repositoryEntityState
			state.repos.filter = {
				isStarred,
			}
			state.repos.starred = starred
			state.repos.isLoading = isLoading
		})

	it('selectRepoSlice', () => {
		expect(selectRepoSlice(getState())).toEqual(initialState)
	})

	it('selectFilter', () => {
		expect(selectFilter(filterState).isStarred).toEqual(true)
	})

	it('selectStarredIds', () => {
		expect(selectStarredIds(starredState)).toEqual([1])
	})

	it('selectIsLoading', () => {
		expect(selectIsLoading(isLoadingState)).toEqual(true)
	})

	describe('selectRepositories', () => {
		it('isLoading is true', () => {
			expect(
				selectRepositories(getRepositoriesState({ isLoading: true }))
			).toEqual([])
		})

		it('isLoading is false', () => {
			expect(
				selectRepositories(getRepositoriesState({ isLoading: false }))
			).toEqual(repositoryEntityState.entities)
		})
	})

	it('selectIsRepoStarred', () => {
		expect(selectIsRepoStarred(starredState, { id: 1 })).toEqual(true)
		expect(selectIsRepoStarred(starredState, { id: 2 })).toEqual(false)
	})

	describe('selectFilteredRepositories', () => {
		it('isLoading is true', () => {
			expect(
				selectFilteredRepositories(
					getFilteredRepositoriesState({
						isLoading: true,
					})
				)
			).toEqual([])
		})

		describe('isLoading is false and', () => {
			it('isStarred is false', () => {
				expect(
					selectFilteredRepositories(
						getFilteredRepositoriesState({
							isLoading: false,
							isStarred: false,
							starred: [2],
						})
					)
				).toEqual(expectedRepositoryModels)
			})

			it('isStarred is true', () => {
				expect(
					selectFilteredRepositories(
						getFilteredRepositoriesState({
							isLoading: false,
							isStarred: true,
							starred: [2],
						})
					)
				).toEqual([expectedRepositoryModels[1]])
			})
		})
	})
})
