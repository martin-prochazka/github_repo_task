import React from 'react'
import * as api from 'repositories/api'
import {Repositories} from 'repositories/components/Repositories'
import {mockedGitHubRepositories} from 'repositories/components/__mocks__/repositoryMocks'
import {render, screen} from 'test-utils/test-utils'

jest.mock('repositories/api')
const mock = jest.spyOn(api, 'getGitHubLastWeekRepositories')

describe('Repositories', () => {
    beforeEach(() => {
        mock.mockResolvedValue({items: mockedGitHubRepositories})
        render(<Repositories />)
    })

    it('should render repositories', async () => {
        const repositories = await screen.findAllByTestId('repository-box')

        expect(repositories).toHaveLength(mockedGitHubRepositories.length)
    })

    it('should render only starred repositories', async () => {
        const isStarredSwitch = await screen.findByTestId('filter-stared-switch')
        let starSwitches = await screen.findAllByTestId('star-switch')

        expect(isStarredSwitch).toBeInTheDocument()
        expect(starSwitches).toHaveLength(mockedGitHubRepositories.length)

        screen.getAllByRole('checkbox')[2].click()
        screen.getAllByRole('checkbox')[0].click()

        starSwitches = await screen.findAllByTestId('star-switch')
        expect(starSwitches).toHaveLength(1)
    })
})
