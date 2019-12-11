import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducers';

const middleware = [thunk];
const initialState = {};

export const store = createStore(
    reducers,
    initialState,
    applyMiddleware( ...middleware)
);
