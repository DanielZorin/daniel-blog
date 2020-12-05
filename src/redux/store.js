import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk'
import postsReducer from './reducers.js'

export const store = createStore(postsReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export default { store, persistor };