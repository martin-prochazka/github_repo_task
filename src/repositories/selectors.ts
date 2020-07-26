import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { RepositoryModel } from 'repositories/slice'

const selectRepoSlice = createSelector(
	(state: RootState) => state.repos,
	repos => repos
)

export const selectFilter = createSelector(selectRepoSlice, repo => repo.filter)

const selectStarredIds = createSelector(selectRepoSlice, repo => repo.starred)

export const selectIsLoading = createSelector(
	selectRepoSlice,
	repo => repo.isLoading
)

const selectRepositories = createSelector(
	selectRepoSlice,
	selectIsLoading,
	(repo, isLoading) => (isLoading ? [] : repo.repositories.entities)
)

export const selectIsRepoStarred = createSelector(
	selectStarredIds,
	(_: any, props: { id: number }) => props.id,
	(starred, id) => {
		return starred.includes(id)
	}
)

export const selectFilteredRepositories = createSelector(
	selectStarredIds,
	selectRepositories,
	selectFilter,
	selectIsLoading,
	(starred, repositories, filter, isLoading) => {
		if (isLoading) {
			return []
		}

		return (filter.isStarred
			? starred.map(id => repositories[id])
			: Object.values(repositories).filter(Boolean)) as RepositoryModel[]
	}
)
