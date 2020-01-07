import { createStore } from 'redux'
import bookReducer from './reducer/root.reducer';

const store = createStore(bookReducer)

export default store;