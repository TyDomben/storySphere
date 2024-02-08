// Action Types

// Used for fetching stories from the backend. These are GET operations.
export const FETCH_STORIES_REQUEST = 'FETCH_STORIES_REQUEST'; // Initiates the fetch operation
export const FETCH_STORIES_SUCCESS = 'FETCH_STORIES_SUCCESS'; // Handles successful fetch
export const FETCH_STORIES_FAILURE = 'FETCH_STORIES_FAILURE'; // Handles fetch errors
// Used for adding a new story to the backend. This could be a POST operation.
export const ADD_STORY_REQUEST = 'ADD_STORY_REQUEST'; // Initiates the add operation
export const ADD_STORY_SUCCESS = 'ADD_STORY_SUCCESS'; // Handles successful addition
export const ADD_STORY_FAILURE = 'ADD_STORY_FAILURE'; // Handles add operation errors
// Used for generating a new story via OpenAI and saving it. This involves calling the OpenAI API and then a POST operation to save the story.
export const GENERATE_STORY_REQUEST = 'GENERATE_STORY_REQUEST'; // Initiates story generation
export const GENERATE_STORY_SUCCESS = 'GENERATE_STORY_SUCCESS'; // Handles successful generation and saving
export const GENERATE_STORY_FAILURE = 'GENERATE_STORY_FAILURE'; // Handles generation/saving errors

// Future expansion for image and audio
// export const GENERATE_IMAGE_REQUEST = 'GENERATE_IMAGE_REQUEST';
// export const GENERATE_IMAGE_SUCCESS = 'GENERATE_IMAGE_SUCCESS';
// export const GENERATE_IMAGE_FAILURE = 'GENERATE_IMAGE_FAILURE';
// export const GENERATE_AUDIO_REQUEST = 'GENERATE_AUDIO_REQUEST';
// export const GENERATE_AUDIO_SUCCESS = 'GENERATE_AUDIO_SUCCESS';
// export const GENERATE_AUDIO_FAILURE = 'GENERATE_AUDIO_FAILURE';

// FETCH STORIES - Action Creators for fetching stories GET
export const fetchStoriesRequest = () => ({
  type: FETCH_STORIES_REQUEST,
});
export const fetchStoriesSuccess = (stories) => ({
  type: FETCH_STORIES_SUCCESS,
  payload: stories,
});
export const fetchStoriesFailure = (error) => ({
  type: FETCH_STORIES_FAILURE,
  payload: error,
});
// Story Action Creators
export const generateStoryRequest = (prompt) => ({
  type: GENERATE_STORY_REQUEST,
  payload: { prompt },
});
export const generateStorySuccess = (story) => ({
  type: GENERATE_STORY_SUCCESS,
  payload: { story },
});
export const generateStoryFailure = (error) => ({
  type: GENERATE_STORY_FAILURE,
  payload: { error },
});

// TODO add Image and Audio Action Creators
// Uncomment and implement these as we expand application
// export const generateImageRequest = (details) => ({ ... });
// export const generateImageSuccess = (image) => ({ ... });
// export const generateImageFailure = (error) => ({ ... });
// export const generateAudioRequest = (details) => ({ ... });
// export const generateAudioSuccess = (audio) => ({ ... });
// export const generateAudioFailure = (error) => ({ ... });
