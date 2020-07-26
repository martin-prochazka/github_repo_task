import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRepositories } from 'repositories/slice'
import {
	selectFilteredRepositories,
	selectIsLoading,
} from 'repositories/selectors'

export const Repositories: React.FC = () => {
	const dispatch = useDispatch()

	const repositories = useSelector(selectFilteredRepositories)
	const isLoading = useSelector(selectIsLoading)

	useEffect(() => {
		dispatch(fetchRepositories())
	}, [dispatch])

	return (
		<>
			<h1>Repositories</h1>
			<div>
				{!isLoading ? (
					repositories.map(repo => (
						<ul key={repo?.id}>
							<li>{repo?.name}</li>
						</ul>
					))
				) : (
					<div>... loading</div>
				)}
			</div>
		</>
	)
}
