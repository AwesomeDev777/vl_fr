const isEmpty = require('../../../utils/is-empty')
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as Action from 'utils/action'

export interface AuthReducerState {
    isAuthenticated: boolean
    user: object
}

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state: AuthReducerState = initialState, action:AnyAction) => {
    switch(action.type) {
        case HYDRATE:
			return { ...state, ...action.payload }
        case Action.SET_CURRENT_USER:        
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}

export default authReducer