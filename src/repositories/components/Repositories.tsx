import React from 'react'
import { useDispatch } from 'react-redux'
import { fetchRepositories } from 'repositories/slice'

export const Repositories: React.FC = () => {
	const dispatch = useDispatch()

	dispatch(fetchRepositories())

	return <div>Repositories</div>
}
