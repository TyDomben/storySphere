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
  DELETE_STORY_REQUEST,
  DELETE_STORY_SUCCESS,
  DELETE_STORY_FAILURE,
  SET_LATEST_STORY_ID, // Make sure to import this
} from "../actions/actions";

const initialState = {
  stories: [],
  isLoading: false,
  error: null,
  latestStoryId: null, // Initialize latestStoryId in the state
};

const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LATEST_STORY_ID:
      return {
        ...state,
        latestStoryId: action.payload,
      };
      case GENERATE_STORY_SUCCESS:
        return {
          ...state,
          stories: [...state.stories, action.payload.story],
          latestStoryId: action.payload.story.id, // Ensure this line correctly updates the ID
          isLoading: false,
          error: null,
        };
    case GENERATE_STORY_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case FETCH_STORIES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_STORIES_SUCCESS:
      return {
        ...state,
        stories: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_STORIES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case ADD_STORY_REQUEST:
      return { ...state, isLoading: true };
    case ADD_STORY_SUCCESS:
      // Add the new story to our array of stories
      return {
        ...state,
        isLoading: false,
        stories: [...state.stories, action.payload],
        error: null,
      };
    case ADD_STORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case GENERATE_STORY_REQUEST:
      return { ...state, isLoading: true };
    case GENERATE_STORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stories: [...state.stories, action.payload.story],
        error: null,
      };
    case DELETE_STORY_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_STORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        stories: state.stories.filter((story) => story.id !== action.payload),
      };
    case DELETE_STORY_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default textReducer;
