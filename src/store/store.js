import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const log = createLogger({ diff: true, collapsed: true });
const middleware = [Thunk, log];
const enhancers = [];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['home']
};
const pReducer = persistReducer(persistConfig, reducers);
export const store = createStore(pReducer, {},
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  ));
export const persistor = persistStore(store);
   //persistor.purge();
