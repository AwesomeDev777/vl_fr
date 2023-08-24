import axios from "axios"
import { Admin_Sign_in } from "utils/adminUrl"
import * as Action from 'utils/action'
import setAuthToken from "utils/setAuthToken"
import jwt_decode from 'jwt-decode'
import nookies from 'nookies'
import {destroyCookie} from 'nookies'

const cookieExpireIn = 30 * 24 * 60 * 60

export const loginUser = (userData: any) => (dispatch: (arg0: { type: string; payload: any }) => void) => {
    axios.post(Admin_Sign_in, userData)
        .then(res => {
            const {token} = res.data;
            nookies.set(null, 'admintoken', token, { maxAge: cookieExpireIn, path: '/'})
            setAuthToken(token)
            const decoded = jwt_decode(token)
            dispatch(setCurrentUser(decoded))
        })
        .catch(err => {
                console.log(err)
                dispatch({
                    type: Action.GET_ERRORS,
                    payload: err.response.data
                })
            }
        )
}

export const setCurrentUser = (decoded: unknown) => {
    return {
        type: Action.SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () => (dispatch: (arg0: { type: string; payload: unknown }) => void) => {
    destroyCookie(null, 'admintoken', {path: '/'})
    setAuthToken(false)
    dispatch(setCurrentUser({}))
}