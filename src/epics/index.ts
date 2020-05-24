import { combineEpics } from 'redux-observable'
import { userLogin, userLogout } from '~/epics/user'
import { fetchRepositories } from '~/epics/github'

export default combineEpics(
    userLogin,
    userLogout,
    fetchRepositories,
)
