// Assuming you have defined action types for audio operations
import {
  FETCH_AUDIOS_REQUEST,
  FETCH_AUDIOS_SUCCESS,
  FETCH_AUDIOS_FAILURE,
  ADD_AUDIO_REQUEST,
  ADD_AUDIO_SUCCESS,
  ADD_AUDIO_FAILURE,
  // Include other audio-related action types as needed
} from '../actions/actions';

const initialState = {
  audios: [],
  isLoading: false,
  error: null,
};

const audioReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUDIOS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_AUDIOS_SUCCESS:
      return { ...state, isLoading: false, audios: action.payload, error: null };
    case FETCH_AUDIOS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case ADD_AUDIO_REQUEST:
      return { ...state, isLoading: true };
    case ADD_AUDIO_SUCCESS:
      // Assuming action.payload is the new audio object
      return { ...state, isLoading: false, audios: [...state.audios, action.payload], error: null };
    case ADD_AUDIO_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    // Add cases for other audio-related actions as needed

    default:
      return state;
  }
};

export default audioReducer;
