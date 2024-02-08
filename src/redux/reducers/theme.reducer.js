// import { TOGGLE_THEME } from "../actions/actions";

// // Initial state for the theme
// const initialThemeState = {
//   mode: "light", // Default theme mode
// };

// // Theme reducer
// const themeReducer = (state = initialThemeState, action) => {
//   switch (action.type) {
//     case TOGGLE_THEME:
//       return {
//         ...state,
//         mode: state.mode === "light" ? "dark" : "light",
//       };
//     default:
//       return state;
//   }
// };

// // for rootReducer
// import { combineReducers } from "redux";
// const rootReducer = combineReducers({
//   // other reducers...
//   theme: themeReducer,
// });

// export default rootReducer;
