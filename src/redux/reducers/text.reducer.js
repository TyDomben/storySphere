import {
  GENERATE_STORY_REQUEST,
  GENERATE_STORY_SUCCESS,
  GENERATE_STORY_FAILURE,
} from '../actions/actions';

const initialState = {
  generatedStory: '',
  isLoading: false,
  error: null,
};

const storyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GENERATE_STORY_REQUEST:
      return { ...state, isLoading: true, error: null };
    case GENERATE_STORY_SUCCESS:
      return { ...state, isLoading: false, generatedStory: action.payload.story };
    case GENERATE_STORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload.error };
    // Future expansion for image and audio
    // case GENERATE_IMAGE_REQUEST:
    // case GENERATE_IMAGE_SUCCESS:
    // case GENERATE_IMAGE_FAILURE:
    // case GENERATE_AUDIO_REQUEST:
    // case GENERATE_AUDIO_SUCCESS:
    // case GENERATE_AUDIO_FAILURE:
    default:
      return state;
  }
};

export default storyReducer;
