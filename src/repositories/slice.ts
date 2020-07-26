import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { convertToRepositories } from 'repositories/utils'

export interface Repository {
	id: number
	name: string
	link: string
	description: string
	stars: number
}

const repositoryAdapter = createEntityAdapter<Repository>()
const initialRepositoryState = repositoryAdapter.getInitialState()

export interface RepositoryState {
	repositories: typeof initialRepositoryState
	starred: { [key: number]: boolean }
	isLoading: boolean
	errors: string[]
}

const initialState: RepositoryState = {
	repositories: initialRepositoryState,
	starred: {},
	isLoading: false,
	errors: [],
}

export const fetchRepositories = createAsyncThunk(
	'repositories/fetchRepositories',
	async () => {
		const response = await axios.get(
			'https://api.github.com/search/repositories?q=created:%3E2020-07-01&sort=stars&order=desc'
		)

		return response?.data
	}
)

export const repositorySlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		addStar: (state, { payload }: PayloadAction<number>) => {
			state.starred[payload] = true
		},
		removeStar: (state, { payload }: PayloadAction<number>) => {
			state.starred[payload] = false
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
