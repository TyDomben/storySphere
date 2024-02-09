import {
  FETCH_STORIES_REQUEST,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
  ADD_STORY_REQUEST,
  ADD_STORY_SUCCESS,
  ADD_STORY_FAILURE,
  GENERATE_STORY_REQUEST,
  GENERATE_STORY_SUCCESS,
  GENERATE_STORY_FAILURE,
} from '../actions/actions';

const initialState = {
  stories: [], // Array to hold our story "kittens"
  isLoading: false,
  error: null,
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORIES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_STORIES_SUCCESS:
      // Populate our stories array with the fetched data
      return { ...state, isLoading: false, stories: action.payload, error: null };
    case FETCH_STORIES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case ADD_STORY_REQUEST:
      return { ...state, isLoading: true };
    case ADD_STORY_SUCCESS:
      // Add the new story to our array of stories
      return { ...state, isLoading: false, stories: [...state.stories, action.payload], error: null };
    case ADD_STORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case GENERATE_STORY_REQUEST:
      return { ...state, isLoading: true };
    case GENERATE_STORY_SUCCESS:
      // This assumes generatedStory adds a single story to our array
      return { ...state, isLoading: false, stories: [...state.stories, action.payload.story], error: null };
    case GENERATE_STORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default textReducer;
