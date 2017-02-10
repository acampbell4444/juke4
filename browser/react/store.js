import {createStore, applyMiddleware} from 'redux';
import {reducers} from './reducers';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

//export default createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//export default createStore(reducers, applyMiddleware(createLogger()));
export default createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));