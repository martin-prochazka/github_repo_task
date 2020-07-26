import {
	Box,
	CircularProgress,
	Container,
	FormControlLabel,
	Switch,
	Typography,
} from '@material-ui/core'
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Repository } from 'repositories/components/Repository'
import {
	selectFilter,
	selectFilteredRepositories,
	selectIsLoading,
} from 'repositories/selectors'
import { fetchRepositories, repositorySlice } from 'repositories/slice'

const { actions } = repositorySlice

export const Repositories: React.FC = () => {
	const dispatch = useDispatch()

	const repositories = useSelector(selectFilteredRepositories)
	const isLoading = useSelector(selectIsLoading)

	const filter = useSelector(selectFilter)

	const handleSetFilter = useCallback(
		(value: boolean) => {
			dispatch(actions.setFilter({ isStarred: value }))
		},
		[dispatch]
	)

	useEffect(() => {
		dispatch(fetchRepositories())
	}, [dispatch])

	return (
		<>
			<Container maxWidth='md'>
				<Box margin={4}>
					<Typography variant='h4' align='center'>
						Trending repositories
					</Typography>
				</Box>

				<FormControlLabel
					control={
						<Switch
							checked={filter.isStarred}
							onChange={e => handleSetFilter(e.target.checked)}
						/>
					}
					label={
						filter.isStarred
							? 'Shows only starred'
							: 'Shows all repos'
					}
					labelPlacement='start'
				/>

				{isLoading ? (
					<Box textAlign='center'>
						<CircularProgress />
					</Box>
				) : (
					<Box display='flex' flexDirection='column'>
						{repositories.map(repository => (
							<Repository
								key={repository.id}
								repository={repository}
							/>
						))}
					</Box>
				)}
			</Container>
		</>
	)
}
