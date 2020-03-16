import { combineReducers } from "redux";
import postsReducer from "./posts";
import postReducer from "./post";
import commentsReducer from "./comments";

import { all } from "redux-saga/effects";
import { fetchPostsSaga } from "./posts";

export const rootReducer = combineReducers({
  posts: postsReducer,
  comments: commentsReducer,
  post: postReducer
});

export function* rootSaga() {
  yield all([fetchPostsSaga()]);
}

/**
 * 
 * import { all } from 'redux-saga/effects'
  import WatcherSaga from './Saga'
  import WatcherSaga2 from './Saga2'
  export default function* rootSaga() {
    yield all([
      WatcherSaga(),
      WatcherSaga2(),
    ])
  }
 */
