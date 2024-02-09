import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";

// Worker sagas for audio
function* fetchAudioSaga() {
  try {
    const response = yield call(axios.get, "/api/audio");
    yield put(actions.fetchAudioSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchAudioFailure(error.toString()));
  }
}

function* addAudioSaga(action) {
  // Implement adding an audio file
}

function* generateAudioSaga(action) {
  // Implement generating an audio file (if applicable)
}

// Watcher sagas for audio
export default function* watchAudioSagas() {
  yield takeLatest(actions.FETCH_AUDIO_REQUEST, fetchAudioSaga);
  yield takeLatest(actions.ADD_AUDIO_REQUEST, addAudioSaga);
  // If you have audio generation functionality
  yield takeLatest(actions.GENERATE_AUDIO_REQUEST, generateAudioSaga);
}
