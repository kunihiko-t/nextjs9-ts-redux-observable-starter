import { of, merge } from 'rxjs'
import { Epic } from 'redux-observable'
import { ofAction } from 'typescript-fsa-redux-observable'
import { AnyAction } from 'typescript-fsa'
import actions from '../actions/user'
import { debounceTime, delay, map, mergeMap,  } from 'rxjs/operators'

export const userLogin: Epic<AnyAction> = (action$) => action$.pipe(
    ofAction(actions.login.started),
    debounceTime(1000),
    delay(1000),
    map(data => {
        return actions.login.done({
            params: { id: data.payload.id },
            result: { data: data },
        })
    }),
)


export const userLogout: Epic<any> = (action$) => action$.pipe(
    ofAction(actions.logout.started),
    debounceTime(1000),
    delay(1000),
    mergeMap(() =>
        merge(
            of(actions.logout.done),
        ),
    ),
)
