import { createSlice, createAction } from "@reduxjs/toolkit";
import { takeLatest, put, call } from "redux-saga/effects";

export const initialState = {
  loading: false,
  hasErrors: false,
  posts: []
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: state => {
      state.loading = true;
    },
    getPostsSuccess: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getPostsFailure: state => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const {
  getPosts,
  getPostsSuccess,
  getPostsFailure
} = postsSlice.actions;

export const fetchAllPosts = createAction("FETCH_ALL_POSTS");

export const postsSelector = state => state.posts;
export default postsSlice.reducer;

export function fetchPosts() {
  return async dispatch => {
    dispatch(getPosts());

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();

      dispatch(getPostsSuccess(data));
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}

const apiFetch = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data);
  return data;
};

export function* fetchPostsSaga() {
  console.log(" INSIDE FETCH POSTS SAGA -- ABOUT TO TRIGGER WORKER SAGA ");
  yield takeLatest("FETCH_ALL_POSTS", workerSaga);
}

export function* workerSaga(action) {
  try {
    yield put(getPosts());
    //const currentPosts = yield select(state => state.posts)
    //const { postId } = action.data
    //const payload = { things, from, action, thingsFromReduxStore }
    const data = yield call(apiFetch /*, payload*/);
    yield put(getPostsSuccess(data));
  } catch (error) {
    yield put(getPostsFailure());
  }
}

/**
 * import { takeLatest, select, call, put } from 'redux-saga/effects'
  import { apiFetch } from '../services/index'
  export default function* watchAction() {
    yield takeLatest('ACTION', workerSaga )
  }
  export function* workerSaga(action) {
    try { 
      const thingsFromReduxStore = yield select(state => state.data)
      const { things, from, action } = action.data 
      const payload = { things, from, action, thingsFromReduxStore }
      const data    = yield call(apiFetch, payload)
      yield put({ type: 'ACTION_SUCCESS', data })
    } catch (error) {
      yield put({ type: 'ACTION_ERROR', error })
    }
  }
 * 
 */
