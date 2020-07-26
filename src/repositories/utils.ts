import { Repository } from 'repositories/slice'

export const convertToRepositories = (items: any[]): Repository[] =>
	items.map(
		({ id, name, description, url: link, stargazers_count: stars }) => ({
			id,
			name,
			description,
			link,
			stars,
		})
	)
