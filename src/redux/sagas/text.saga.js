// textSagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";
// import {
//   GENERATE_STORY_REQUEST,
//   generateStorySuccess,
//   generateStoryFailure,
// } from '../actions/actions';

// !WORKER SAGAs
function* fetchStoriesSaga() {
  try {
    const response = yield call(axios.get, "/api/text");
    yield put(actions.fetchStoriesSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchStoriesFailure(error.toString()));
  }
}
// Worker saga: Add story
function* addStorySaga(action) {
  // Implementation
}
// Worker saga: Generate story
function* generateStorySaga(action) {
  // Implementation
}

// !WATCHER SAGAs
// just the REQUESTs
export default function* watchTextSagas() {
  yield takeLatest(actions.FETCH_STORIES_REQUEST, fetchStoriesSaga);
  yield takeLatest(actions.ADD_STORY_REQUEST, addStorySaga);
  yield takeLatest(actions.GENERATE_STORY_REQUEST, generateStorySaga);
}