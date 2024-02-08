// import { takeLatest, put, call } from 'redux-saga/effects';
// import { TOGGLE_THEME } from './actions';

// // Worker saga
// function* handleToggleTheme() {
//   // Example: Save the theme mode to local storage
//   const currentMode = yield call([localStorage, 'getItem'], 'themeMode');
//   const newMode = currentMode === 'light' ? 'dark' : 'light';
//   yield call([localStorage, 'setItem'], 'themeMode', newMode);
//   // No need to dispatch an action here since the reducer already handles the state update
// }

// // Watcher saga
// function* watchToggleTheme() {
//   yield takeLatest(TOGGLE_THEME, handleToggleTheme);
// }

// export default function* rootSaga() {
//   yield all([
//     // other sagas...
//     watchToggleTheme(),
//   ]);
// }
