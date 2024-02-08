import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import * as actions from "../actions/actions";

// Worker sagas for images
function* fetchImagesSaga() {
  try {
    const response = yield call(axios.get, "/api/images");
    yield put(actions.fetchImagesSuccess(response.data));
  } catch (error) {
    yield put(actions.fetchImagesFailure(error.toString()));
  }
}

function* addImageSaga(action) {
  // Implement adding an image
}

function* generateImageSaga(action) {
  // Implement generating an image (if applicable)
}

// Watcher sagas for images
export default function* watchImageSagas() {
  yield takeLatest(actions.FETCH_IMAGES_REQUEST, fetchImagesSaga);
  yield takeLatest(actions.ADD_IMAGE_REQUEST, addImageSaga);
  // If you have image generation functionality
  yield takeLatest(actions.GENERATE_IMAGE_REQUEST, generateImageSaga);
}
