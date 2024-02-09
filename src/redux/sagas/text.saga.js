import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";

// Fetch stories from the server
function* fetchStoriesSaga() {
  try {
    const response = yield call(axios.get, "/api/text");
    yield put(actions.fetchStoriesSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchStoriesFailure(error.toString()));
  }
}

// Worker saga for adding a new story to the server
function* addStorySaga(action) {
  try {
    // Attempt to POST the new story data to the server
    const response = yield call(axios.post, "/api/text", action.payload);
    // Dispatch success action with the server's response
    yield put(actions.addStorySuccess(response.data));

    // Optional: Implement follow-up actions after successful story addition
    // For example, you might want to redirect the user to the story list or the newly added story
    // Or, you could refetch the list of stories to include the newly added story
    // yield put(actions.fetchStoriesRequest()); //! Uncomment to refetch stories

  } catch (error) {
    // Dispatch failure action if the API call fails
    yield put(actions.addStoryFailure(error.toString()));
  }
}

// Worker saga for generating a story using OpenAI (placeholder)
function* generateStorySaga(action) {
  // !Implementation of story generation logic goes here
  // !For example, call OpenAI's API and then save the generated story
}

// Watcher sagas listening for dispatched actions
export default function* watchTextSagas() {
  yield takeLatest(actions.FETCH_STORIES_REQUEST, fetchStoriesSaga);
  yield takeLatest(actions.ADD_STORY_REQUEST, addStorySaga);
  yield takeLatest(actions.GENERATE_STORY_REQUEST, generateStorySaga);
}
