import { combineEpics } from 'redux-observable'
import { userLogin, userLogout } from './user'
import { fetchRepositories } from './github'

export default combineEpics(
    userLogin,
    userLogout,
    fetchRepositories,
)