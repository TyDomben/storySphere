// actions.js
// story id to link with image id
export const SET_LATEST_STORY_ID = "SET_LATEST_STORY_ID";

// Text-related action types
export const FETCH_STORIES_REQUEST = "FETCH_STORIES_REQUEST";
export const FETCH_STORIES_SUCCESS = "FETCH_STORIES_SUCCESS";
export const FETCH_STORIES_FAILURE = "FETCH_STORIES_FAILURE";

export const ADD_STORY_REQUEST = "ADD_STORY_REQUEST";
export const ADD_STORY_SUCCESS = "ADD_STORY_SUCCESS";
export const ADD_STORY_FAILURE = "ADD_STORY_FAILURE";

export const GENERATE_STORY_REQUEST = "GENERATE_STORY_REQUEST";
export const GENERATE_STORY_SUCCESS = "GENERATE_STORY_SUCCESS";
export const GENERATE_STORY_FAILURE = "GENERATE_STORY_FAILURE";

// Image-related action types
export const FETCH_IMAGES_REQUEST = "FETCH_IMAGES_REQUEST";
export const FETCH_IMAGES_SUCCESS = "FETCH_IMAGES_SUCCESS";
export const FETCH_IMAGES_FAILURE = "FETCH_IMAGES_FAILURE";

export const ADD_IMAGE_REQUEST = "ADD_IMAGE_REQUEST";
export const ADD_IMAGE_SUCCESS = "ADD_IMAGE_SUCCESS";
export const ADD_IMAGE_FAILURE = "ADD_IMAGE_FAILURE";

export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_FAILURE = "GENERATE_IMAGE_FAILURE";

// Audio-related action types
export const FETCH_AUDIOS_REQUEST = "FETCH_AUDIOS_REQUEST";
export const FETCH_AUDIOS_SUCCESS = "FETCH_AUDIOS_SUCCESS";
export const FETCH_AUDIOS_FAILURE = "FETCH_AUDIOS_FAILURE";

export const ADD_AUDIO_REQUEST = "ADD_AUDIO_REQUEST";
export const ADD_AUDIO_SUCCESS = "ADD_AUDIO_SUCCESS";
export const ADD_AUDIO_FAILURE = "ADD_AUDIO_FAILURE";

export const GENERATE_AUDIO_REQUEST = "GENERATE_AUDIO_REQUEST";
export const GENERATE_AUDIO_SUCCESS = "GENERATE_AUDIO_SUCCESS";
export const GENERATE_AUDIO_FAILURE = "GENERATE_AUDIO_FAILURE";

// !!DELETE ROUTE
export const DELETE_STORY_REQUEST = "DELETE_STORY_REQUEST";
export const DELETE_STORY_SUCCESS = "DELETE_STORY_SUCCESS";
export const DELETE_STORY_FAILURE = "DELETE_STORY_FAILURE";
// !!DELETE ROUTE
export const DELETE_IMAGE_REQUEST = "DELETE_IMAGE_REQUEST";
export const DELETE_IMAGE_SUCCESS = "DELETE_IMAGE_SUCCESS";
export const DELETE_IMAGE_FAILURE = "DELETE_IMAGE_FAILURE";
// !!DELETE ROUTE
export const DELETE_AUDIO_REQUEST = "DELETE_AUDIO_REQUEST";
export const DELETE_AUDIO_SUCCESS = "DELETE_AUDIO_SUCCESS";
export const DELETE_AUDIO_FAILURE = "DELETE_AUDIO_FAILURE";
// !!DELETE ROUTE

// Action Creators
export const setLatestStoryId = (data) => ({
  type: SET_LATEST_STORY_ID,
  payload: data,
});
// Action creators for text-related actions
export const fetchStoriesRequest = () => ({
  type: FETCH_STORIES_REQUEST,
});
export const fetchStoriesSuccess = (data) => ({
  type: FETCH_STORIES_SUCCESS,
  payload: data,
});
export const fetchStoriesFailure = (error) => ({
  type: FETCH_STORIES_FAILURE,
  payload: error,
});

export const addStoryRequest = (data) => ({
  type: ADD_STORY_REQUEST,
  payload: data,
});
export const addStorySuccess = (data) => ({
  type: ADD_STORY_SUCCESS,
  payload: data,
});
export const addStoryFailure = (error) => ({
  type: ADD_STORY_FAILURE,
  payload: error,
});

export const generateStoryRequest = (data) => ({
  type: GENERATE_STORY_REQUEST,
  payload: data, // This directly uses the data object received, which should include both `prompt` and `userId` and more
});
export const generateStorySuccess = (data) => ({
  type: GENERATE_STORY_SUCCESS,
  payload: data, // Assuming data could be an object containing the story and possibly other relevant information
});
export const generateStoryFailure = (data) => ({
  type: GENERATE_STORY_FAILURE,
  payload: data, // Assuming data could be an object containing error details and possibly other context
});
// !! DELETE Route
export const deleteStoryRequest = (storyId) => ({
  type: "DELETE_STORY_REQUEST",
  payload: storyId,
  // this payload COULD change to data to match but let's not get too crazy
});
// !! DELETE Route
export const deleteStorySuccess = (storyId) => ({
  type: "DELETE_STORY_SUCCESS",
  payload: storyId,
  // this payload COULD change to data to match but let's not get too crazy
});
// !! DELETE Route
export const deleteStoryFailure = (error) => ({
  type: "DELETE_STORY_FAILURE",
  payload: error,
});
// !! DELETE Route
// Action creators for image-related actions
export const fetchImagesRequest = () => ({
  type: FETCH_IMAGES_REQUEST,
});
export const fetchImagesSuccess = (data) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: data,
});
export const fetchImagesFailure = (error) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: error,
});

export const addImageRequest = (data) => ({
  type: ADD_IMAGE_REQUEST,
  payload: data,
});
export const addImageSuccess = (data) => ({
  type: ADD_IMAGE_SUCCESS,
  payload: data,
});
export const addImageFailure = (error) => ({
  type: ADD_IMAGE_FAILURE,
  payload: error,
});

export const generateImageRequest = (data) => ({
  type: GENERATE_IMAGE_REQUEST,
  payload: data,
});
export const generateImageSuccess = (data) => ({
  type: GENERATE_IMAGE_SUCCESS,
  payload: data,
});
export const generateImageFailure = (error) => ({
  type: GENERATE_IMAGE_FAILURE,
  payload: error,
});

// Action creators for audio-related actions
export const fetchAudiosRequest = () => ({
  type: FETCH_AUDIOS_REQUEST,
});
export const fetchAudiosSuccess = (data) => ({
  type: FETCH_AUDIOS_SUCCESS,
  payload: data,
});
export const fetchAudiosFailure = (error) => ({
  type: FETCH_AUDIOS_FAILURE,
  payload: error,
});

export const addAudioRequest = (data) => ({
  type: ADD_AUDIO_REQUEST,
  payload: data,
});
export const addAudioSuccess = (data) => ({
  type: ADD_AUDIO_SUCCESS,
  payload: data,
});
export const addAudioFailure = (error) => ({
  type: ADD_AUDIO_FAILURE,
  payload: error,
});

export const generateAudioRequest = (data) => ({
  type: GENERATE_AUDIO_REQUEST,
  payload: data,
});
export const generateAudioSuccess = (data) => ({
  type: GENERATE_AUDIO_SUCCESS,
  payload: data,
});
export const generateAudioFailure = (error) => ({
  type: GENERATE_AUDIO_FAILURE,
  payload: error,
});
