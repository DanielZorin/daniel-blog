import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import postsReducer from './reducers.js'

export const store = createStore(postsReducer);

export const persistor = persistStore(store);

export default { store, persistor };