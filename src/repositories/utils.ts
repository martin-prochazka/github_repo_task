import { RepositoryModel } from 'repositories/slice'
import { subDays, formatISO } from 'date-fns'

export const convertToRepositories = (items: any[]): RepositoryModel[] =>
	items.map(
		({
			id,
			name,
			description,
			html_url: link,
			stargazers_count: stars,
		}) => ({
			id,
			name,
			description,
			link,
			stars,
		})
	)

export const getLastWeekDate = () =>
	formatISO(subDays(new Date(), 7), { representation: 'date' })
