import {
	Box,
	Card,
	CardActions,
	CardContent,
	Link,
	Switch,
	Typography,
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
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
		<Box margin={1} data-testid='repository-box'>
			<Card>
				<CardContent>
					<Typography variant='h6' data-testid='repository-name'>
						{repository.name}
					</Typography>
					<Box display='flex' alignItems='end'>
						<Box marginRight={1}>
							<StarIcon fontSize='small' />
						</Box>
						<Typography data-testid='repository-stars'>
							{repository.stars}
						</Typography>
					</Box>
					<Typography data-testid='repository-description'>
						{repository.description}
					</Typography>
					<Link
						href={repository.link}
						target='_blank'
						data-testid='repository-link'
					>
						{repository.link}
					</Link>
				</CardContent>
				<CardActions>
					<Switch
						checked={isStarred}
						onChange={e => handleStarred(e.target.checked)}
						data-testid='star-switch'
					/>
					<Typography
						variant='caption'
						data-testid='repository-starred-label'
					>
						{isStarred ? 'Unstar this repo' : 'Star this repo'}
					</Typography>
				</CardActions>
			</Card>
		</Box>
	)
}
