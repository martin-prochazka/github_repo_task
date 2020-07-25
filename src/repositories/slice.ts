import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export interface Repository {
	id: number
	name: string
	link: string
	description: string
	stars: number
}

export interface RepositoryState {
	repositories: Repository[]
	starred: { [key: number]: boolean }
}

const initialState: RepositoryState = {
	repositories: [],
	starred: {},
}

export const fetchRepositories = createAsyncThunk(
	'repositories/fetchRepositories',
	async () => {
		const response = await axios.get(
			'https://api.github.com/search/repositories?q=created:%3E2020-07-01&sort=stars&order=desc'
		)
		console.log(response)
	}
)

export const repositorySlice = createSlice({
	name: 'repositories',
	initialState,
	reducers: {
		addStar: (
			state: RepositoryState,
			{ payload }: PayloadAction<number>
		) => {
			state.starred[payload] = true
		},
		removeStar: (
			state: RepositoryState,
			{ payload }: PayloadAction<number>
		) => {
			state.starred[payload] = false
		},
	},
})
