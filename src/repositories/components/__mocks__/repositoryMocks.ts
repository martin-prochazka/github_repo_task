import {RepositoryModel} from 'repositories/slice'

export const mockedGitHubRepositories = [
    {
        id: 1,
        name: 'repository 1',
        description: 'description 1',
        html_url: 'https://github.com/owner1/repository1',
        stargazers_count: 111,
    },
    {
        id: 2,
        name: 'repository 2',
        description: 'description 2',
        html_url: 'https://github.com/owner2/repository2',
        stargazers_count: 222,
    },
    {
        id: 3,
        name: 'repository 3',
        description: 'description 3',
        html_url: 'https://github.com/owner3/repository3',
        stargazers_count: 333,
    },
]

export const mockedRepositoryModels: RepositoryModel[] = [
    {
        id: 1,
        name: 'repository 1',
        description: 'description 1',
        link: 'https://github.com/owner1/repository1',
        stars: 111,
    },
    {
        id: 2,
        name: 'repository 2',
        description: 'description 2',
        link: 'https://github.com/owner2/repository2',
        stars: 222,
    },
    {
        id: 3,
        name: 'repository 3',
        description: 'description 3',
        link: 'https://github.com/owner3/repository3',
        stars: 333,
    },
]
