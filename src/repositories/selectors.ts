import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'

const selectRepoSlice = createSelector(
	(state: RootState) => state.repos,
	repos => repos
)

const selectFilter = createSelector(selectRepoSlice, repo => repo.filter)

const selectStarredIds = createSelector(selectRepoSlice, repo => repo.starred)

const selectRepositories = createSelector(selectRepoSlice, repo =>
	Object.values(repo.repositories.entities)
)

export const selectIsLoading = createSelector(
	selectRepoSlice,
	repo => repo.isLoading
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

		return filter.isStarred
			? starred.map(id => repositories[id])
			: repositories
	}
)
