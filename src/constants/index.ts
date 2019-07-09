import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
    USER_LOGIN: undefined,
    USER_LOGOUT: undefined,
    FETCH_REPOSITORIES: undefined,
    CANCEL_FETCH: undefined,
    SHOW_ALERT: undefined,
    HIDE_ALERT: undefined,
})

export const ApiBaseUrl = require('./url.dev').ApiBaseUrl
