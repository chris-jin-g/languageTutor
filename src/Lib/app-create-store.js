import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import reducers from '../Reducer';
import thunk from './redux-thunk';
import reporter from './redux-reporter';
import {
  persistStore,
  persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const config = {
  key: 'root',
  storage
}

const reducer = persistReducer(config, reducers)
const createAppStore = () => {
  const store = createStore(reducer, compose(applyMiddleware(thunk, reporter)));
  let persistor = persistStore(store)

  return {
    persistor,
    store
  }
}

export default createAppStore;