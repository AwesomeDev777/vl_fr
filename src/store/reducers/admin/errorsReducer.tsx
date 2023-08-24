const isEmpty = require('../../../utils/is-empty')
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'

import * as Action from 'utils/action'

export interface ErrorsReducerState {
    errors: object
}

const initialState = {
    errors: {}
}

const errorsReducer = (state: ErrorsReducerState = initialState, action:AnyAction) => {
    switch(action.type) {
        case HYDRATE:
			return { ...state, ...action.payload }
        case Action.GET_ERRORS:        
            return {
                ...state,
                errors: action.payload
            }
        default:
            return state;
    }
}

export default errorsReducer