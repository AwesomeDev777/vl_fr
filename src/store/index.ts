import { applyMiddleware, createStore, Store } from 'redux'
import { createWrapper, Context } from 'next-redux-wrapper'
import { composeWithDevTools } from '@redux-devtools/extension'
import reducers from './reducers'
import thunk from 'redux-thunk'
// import createSagaMiddleware from 'redux-saga'
// import rootSaga from './sagas'
// const sagaMiddleware = createSagaMiddleware()

const makeStore = (context: Context) => {
	// const store = createStore(reducers, composeWithDevTools(applyMiddleware(sagaMiddleware)))
	// sagaMiddleware.run(rootSaga)
	
	const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))
	return store
}

export const wrapper = createWrapper<Store>(makeStore)
