import {
	Box,
	Card,
	CardActions,
	CardContent,
	Link,
	Switch,
	Typography,
} from '@material-ui/core'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsRepoStarred } from 'repositories/selectors'
import { RepositoryModel, repositorySlice } from 'repositories/slice'
import { RootState } from 'store'

export interface RepositoryProps {
	repository: RepositoryModel
}

const { actions } = repositorySlice

export const Repository: React.FC<RepositoryProps> = ({ repository }) => {
	const dispatch = useDispatch()

	const isStarred = useSelector((state: RootState) =>
		selectIsRepoStarred(state, { id: repository.id })
	)

	const handleStarred = useCallback(
		(value: boolean) => {
			if (value) {
				dispatch(actions.addStar(repository.id))
			} else {
				dispatch(actions.removeStar(repository.id))
			}
		},
		[dispatch, repository]
	)

	return (
		<Box margin={1}>
			<Card>
				<CardContent>
					<Typography variant='h6'>{repository.name}</Typography>
					<Typography variant='body1'>
						{repository.description}
					</Typography>
					<Link href={repository.link} target='_blank'>
						{repository.link}
					</Link>
					<Typography variant='body2'>
						Stars: {repository.stars}
					</Typography>
				</CardContent>
				<CardActions>
					<Switch
						checked={isStarred}
						onChange={e => handleStarred(e.target.checked)}
					/>
				</CardActions>
			</Card>
		</Box>
	)
}
