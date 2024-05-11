import { applyMiddleware, combineReducers, createStore } from 'redux';
import accountReducer from '../features/accounts/accountSlice old';
import customerReducer from '../features/customers/customerSlice';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
