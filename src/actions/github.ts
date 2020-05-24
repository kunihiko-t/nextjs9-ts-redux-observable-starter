import { ActionTypes } from '~/constants'

import actionCreatorFactory from 'typescript-fsa'

const ac = actionCreatorFactory()

interface FetchRepositoryParam {
}

interface FetchRepositoryResult {
    repositories: any
}

interface FetchRepositoryError {
    error: string
}

export default {
    fetchRepositories: ac.async<FetchRepositoryParam, FetchRepositoryResult, FetchRepositoryError>(ActionTypes.FETCH_REPOSITORIES),
}
