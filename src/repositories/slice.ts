import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { convertToRepositories, getLastWeekDate } from 'repositories/utils'
import { getGitHubLastWeekRepositories } from 'repositories/api'

export interface RepositoryModel {
	id: number
	name: string
	link: string
	description: string
	stars: number
}

export const repositoryAdapter = createEntityAdapter<RepositoryModel>()
const initialRepositoryState = repositoryAdapter.getInitialState()

export interface RepositoryFilter {
	isStarred: boolean
}

export interface RepositoryState {
	repositories: typeof initialRepositoryState
	starred: number[]
	isLoading: boolean
	errors: string[]
	filter: RepositoryFilter
}

export const initialState: RepositoryState = {
	repositories: initialRepositoryState,
	starred: [],
	isLoading: false,
	errors: [],
	filter: {
		isStarred: false,
	},
}

export const fetchRepositories = createAsyncThunk(
	'repositories/fetchRepositories',
	async () => {
		const response = await getGitHubLastWeekRepositories()

		return response?.data
	}
)

export const repositorySlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		clear: () => initialState,
		addStar: (state, { payload }: PayloadAction<number>) => {
			state.starred.push(payload)
		},
		removeStar: (state, { payload }: PayloadAction<number>) => {
			state.starred = state.starred.filter(id => id !== payload)
		},
		setFilter: (state, { payload }: PayloadAction<RepositoryFilter>) => {
			state.filter = payload
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchRepositories.pending, state => {
			state.isLoading = true
		})
		builder.addCase(fetchRepositories.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.errors = []

			const repositories = convertToRepositories(payload.items)
			repositoryAdapter.setAll(state.repositories, repositories)
		})
		builder.addCase(fetchRepositories.rejected, (state, { error }) => {
			const { message } = error

			state.isLoading = false
			state.errors = message ? [message] : ['Unknown error']
		})
	},
})
