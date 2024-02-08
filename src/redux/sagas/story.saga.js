// Import the necessary methods from redux-saga/effects
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  GENERATE_STORY_REQUEST,
  generateStorySuccess,
  generateStoryFailure,
} from '../actions/actions';

// Worker saga will be fired on GENERATE_STORY_REQUEST actions
function* generateStorySaga(action) {
  try {
    const response = yield call(axios.post, '/api/text/generate', {
      prompt: action.payload.prompt,
    });
    // Dispatch a success action to the store with the new story
    yield put(generateStorySuccess(response.data));
  } catch (error) {
    // Dispatch a failure action to the store with the error
    yield put(generateStoryFailure(error.toString()));
  }
}

// Starts generateStorySaga on each dispatched GENERATE_STORY_REQUEST action
// Allows concurrent fetches of stories
export function* watchGenerateStoryRequest() {
  yield takeLatest(GENERATE_STORY_REQUEST, generateStorySaga);
}

// TODO: Add watchers for image and audio generation when implemented
// Uncomment the following lines and create corresponding sagas
// export function* watchGenerateImageRequest() { /* ... */ }
// export function* watchGenerateAudioRequest() { /* ... */ }
