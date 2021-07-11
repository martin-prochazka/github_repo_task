import {getLastWeekDate} from 'repositories/utils'
import axios from 'axios'

export const REPOS_COUNT = 50

export const getGitHubLastWeekRepositories = async () => {
    const date = getLastWeekDate()
    const response = await axios.get(
        `https://api.github.com/search/repositories?q=created:%3E${date}&sort=stars&order=desc&per_page=${REPOS_COUNT}`
    )

    return response?.data
}
