import { configureStore } from '@reduxjs/toolkit'
import { repositorySlice } from 'repositories/slice'

export const store = configureStore({
	reducer: {
		repositories: repositorySlice.reducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
