import { combineReducers } from 'redux'
import layoutReducer, { LayoutReducerState } from './layoutReducer'
import menuReducer, { MenuReducerState } from './menuReducer'
import offcanvasReducer, { OffcanvasReducerState } from './offcanvasReducer'
import breadcrumbReducer, { BreadcrumbReducerState } from './breadcrumbReducer'
import pageReducer, { PageReducerState } from './pageReducer'
import authReducer, { AuthReducerState } from './admin/authReducer'
import errorsReducer, {ErrorsReducerState} from './admin/errorsReducer'

export interface State {
	auth: AuthReducerState
	errors: ErrorsReducerState
	layout: LayoutReducerState
	breadcrumb: BreadcrumbReducerState
	offcanvas: OffcanvasReducerState
	menu: MenuReducerState
	page: PageReducerState
}

const reducers = combineReducers({
	errors: errorsReducer,
	auth: authReducer,
	layout: layoutReducer,
	breadcrumb: breadcrumbReducer,
	offcanvas: offcanvasReducer,
	menu: menuReducer,
	page: pageReducer,
})

export default reducers
