import configureStore from './createStore'
import rootSaga from '../../sagas/index'
import rootReducer from '../../reducer/index';

export default () => {
  return configureStore(rootReducer, rootSaga)
}