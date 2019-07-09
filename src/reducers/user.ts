import immutable from 'immutability-helper'
import { reducerWithInitialState } from 'typescript-fsa-reducers'
import actions from '../actions/user'

export const userState = {
    isAuthenticated: false,
    status: 'idle',
}

export default {
    user: reducerWithInitialState(userState)
        .case(actions.login.started, (state, action) => {
            return immutable(state, {
                status: { $set: 'running' },
            })
        })
        .case(actions.login.done, (state, action) => {
            return immutable(state, {
                status: { $set: 'idle' },
                isAuthenticated: { $set: true },
            })
        })
        .case(actions.login.failed, (state, action) => {
            return immutable(state, {
                status: { $set: 'running' },
                isAuthenticated: { $set: false },
            })
        })
        .case(actions.logout.started, (state, action) => {
            return immutable(state, {
                status: { $set: 'running' },
            })
        })
        .case(actions.logout.done, (state, action) => {
            return immutable(state, {
                status: { $set: 'idle' },
                isAuthenticated: { $set: false },
            })
        })
        .case(actions.logout.failed, (state, action) => {
            return immutable(state, {
                status: { $set: 'idle' },
                isAuthenticated: { $set: false },
            })
        })
    ,
}
