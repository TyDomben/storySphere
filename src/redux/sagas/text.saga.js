import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";
import { fetchStoriesSuccess, fetchStoriesFailure } from "../actions/actions";
import { generateStorySuccess, generateStoryFailure } from "../actions/actions";

// Fetch stories from the server
function* fetchStoriesSaga() {
  try {
    const response = yield call(axios.get, "/api/text");
    yield put(fetchStoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchStoriesFailure(error.toString()));
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
    yield put(actions.fetchStoriesRequest()); //! Uncomment to refetch stories
  } catch (error) {
    // Dispatch failure action if the API call fails
    yield put(actions.addStoryFailure(error.toString()));
  }
}
//  !! DELETE !!
function* deleteStorySaga(action) {
  try {
    yield call(axios.delete, `/api/text/${action.payload}`);
    yield put({ type: "DELETE_STORY_SUCCESS", payload: action.payload });
    const shouldRefetch = confirm("Do you want to update the story list?");
    if (shouldRefetch) {
      yield put(fetchStoriesRequest());
    }
  } catch (error) {
    yield put({ type: "DELETE_STORY_FAILURE", payload: error.message });
  }
}

// Worker saga for generating a story using OpenAI (prototype)
function* generateStorySaga(action) {
  try {
    // Extracting prompt, userId, and title from the payload
    const { prompt, userId, title } = action.payload;

    // API call to generate the story
    const response = yield call(axios.post, "/api/text/generate", {
      prompt,
      userId,
      title,
    });

    // Dispatch success action with the response data
    yield put(actions.generateStorySuccess(response.data));

    // Assuming the story ID is part of the response data and accessible as response.data.id
    // Dispatch action to set the latest story ID in the Redux store
    if (response.data && response.data.id) {
      yield put(actions.setLatestStoryId(response.data.id));
    }
  } catch (error) {
    // Dispatch failure action if there's an error
    yield put(actions.generateStoryFailure(error.message));
  }
}

// Watcher sagas listening for dispatched actions
export default function* watchTextSagas() {
  yield takeLatest(actions.FETCH_STORIES_REQUEST, fetchStoriesSaga);
  yield takeLatest(actions.ADD_STORY_REQUEST, addStorySaga);
  yield takeLatest(actions.GENERATE_STORY_REQUEST, generateStorySaga);
  yield takeLatest(actions.DELETE_STORY_REQUEST, deleteStorySaga); //! DELETE cruD !!
}
