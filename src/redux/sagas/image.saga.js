import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";
import { fetchImagesSuccess, fetchImagesFailure } from "../actions/actions";
import { addImageSuccess, addImageFailure } from "../actions/actions";
import { generateImageSuccess, generateImageFailure } from "../actions/actions";
import { fetchImagesRequest } from "../actions/actions";

// Worker sagas for images
function* fetchImagesSaga() {
  try {
    const response = yield call(axios.get, "/api/images");
    yield put({ type: "FETCH_IMAGES_SUCCESS", payload: response.data });
  } catch (error) {
    yield put({ type: "FETCH_IMAGES_FAILURE", payload: error.toString() });
  }
}

function* addImageSaga(action) {
  try {
    const response = yield call(axios.post, "/api/images", action.payload);
    yield put(actions.addImageSuccess(response.data));
    yield put(actions.fetchImagesRequest());
  } catch (error) {
    yield put(actions.addImageFailure(error.toString()));
  }
}

function* generateImageSaga(action) {
  try {
    const { prompt, userId, title } = action.payload;
    const response = yield call(axios.post, "/api/images/generate", {
      prompt,
      userId,
      title,
    });
    // Assuming your reducer expects the data directly in the action's payload
    yield put(generateImageSuccess(response.data)); // Directly passing response.data as payload
  } catch (error) {
    yield put(generateImageFailure(error.toString())); // Passing error message as payload
  }
}

// Watcher sagas for images
export default function* watchImageSagas() {
  yield takeLatest(actions.FETCH_IMAGES_REQUEST, fetchImagesSaga);
  yield takeLatest(actions.ADD_IMAGE_REQUEST, addImageSaga);
  // If you have image generation functionality
  yield takeLatest(actions.GENERATE_IMAGE_REQUEST, generateImageSaga);
}
