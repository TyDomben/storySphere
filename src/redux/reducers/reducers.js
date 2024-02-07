import { TOGGLE_THEME } from './actions';

// Initial state for the theme
const initialThemeState = {
  mode: 'light', // Default theme mode
};

// Theme reducer
const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light',
      };
    default:
      return state;
  }
};

// Assuming you have a rootReducer
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
  // other reducers...
  theme: themeReducer,
});

export default rootReducer;
