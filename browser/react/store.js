import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/root-reducer';
import {thunkMiddleware} from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

//export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//export default createStore(reducer, applyMiddleware(createLogger()));
export default createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)));