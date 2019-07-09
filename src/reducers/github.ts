import immutable from 'immutability-helper'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import actions from '../actions/github'

export const githubState = {
    status: 'idle',
    repositories: [],
}
export default {
    github: reducerWithInitialState(githubState)
        .case(actions.fetchRepositories.started, (state, action) => {
            return immutable(state, {
                status: { $set: 'running' },
                repositories: { $set: [] },
            })
        })
        .case(actions.fetchRepositories.done, (state, action) => {
            return immutable(state, {
                status: { $set: 'idle' },
                repositories: { $set: action.result.repositories },
            })
        })
        .case(actions.fetchRepositories.failed, (state, action) => {
            return immutable(state, {
                status: { $set: 'idle' },
                repositories: { $set: [] },
            })
        })
    ,
}
