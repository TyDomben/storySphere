// rootSaga.js
import { all } from "redux-saga/effects";
import loginSaga from "./login.saga";
import registrationSaga from "./registration.saga";
import userSaga from "./user.saga";
import watchTextSagas from './text.saga'
import watchImageSagas from "./imageSaga";
// import watchAudioSagas from "./audioSagas";

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
// TODO expand on this saga file
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    watchTextSagas(),
    watchImageSagas(),
    // watchAudioSagas(),
  ]);
}
