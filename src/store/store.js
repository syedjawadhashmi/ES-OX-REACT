/**
 * Created by Admin on 12/28/2016.
 */


import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducer';


export default (initialState = {}) => {
    let middleware = applyMiddleware(thunk);

    if (process.env.NODE_ENV !== 'production') {
        // configure redux-devtools-extension
        // @see https://github.com/zalmoxisus/redux-devtools-extension
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            middleware = compose(middleware, devToolsExtension());
        }
    }
    const store = createStore(reducers, initialState, middleware);

    if (module.hot) {
        module.hot.accept('../reducers/reducer', () => {
            store.replaceReducer(require('../reducers/reducer').default);
        });
    }

    return store;
};
