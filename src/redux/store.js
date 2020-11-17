import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import allReducers from './reducers';

const middleware = applyMiddleware(thunk, promise ) // inside the function we will add middleware
const store = createStore(allReducers, {}, composeWithDevTools(middleware))

export default store;