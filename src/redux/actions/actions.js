// actions.js

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

// !!DELETE!!
export const DELETE_STORY_REQUEST = "DELETE_STORY_REQUEST";
export const DELETE_STORY_SUCCESS = "DELETE_STORY_SUCCESS";
export const DELETE_STORY_FAILURE = "DELETE_STORY_FAILURE";


export const DELETE_IMAGE_REQUEST = "DELETE_IMAGE_REQUEST";
export const DELETE_IMAGE_SUCCESS = "DELETE_IMAGE_SUCCESS";
export const DELETE_IMAGE_FAILURE = "DELETE_IMAGE_FAILURE";

export const DELETE_AUDIO_REQUEST = "DELETE_AUDIO_REQUEST";
export const DELETE_AUDIO_SUCCESS = "DELETE_AUDIO_SUCCESS";
export const DELETE_AUDIO_FAILURE = "DELETE_AUDIO_FAILURE";
// !!!!

// Action creators for text-related actions
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

export const addStoryRequest = (storyData) => ({
  type: ADD_STORY_REQUEST,
  payload: storyData,
});
export const addStorySuccess = (story) => ({
  type: ADD_STORY_SUCCESS,
  payload: story,
});
export const addStoryFailure = (error) => ({
  type: ADD_STORY_FAILURE,
  payload: error,
});

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
// !! DELETE !!
export const deleteStoryRequest = (storyId) => ({
  type: "DELETE_STORY_REQUEST",
  payload: storyId,
});
export const deleteStorySuccess = (storyId) => ({
  type: "DELETE_STORY_SUCCESS",
  payload: storyId,
});
export const deleteStoryFailure = (error) => ({
  type: "DELETE_STORY_FAILURE",
  payload: error, 
}); // !!!!
// Action creators for image-related actions
export const fetchImagesRequest = () => ({
  type: FETCH_IMAGES_REQUEST,
});
export const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES_SUCCESS,
  payload: images,
});
export const fetchImagesFailure = (error) => ({
  type: FETCH_IMAGES_FAILURE,
  payload: error,
});

export const addImageRequest = (imageData) => ({
  type: ADD_IMAGE_REQUEST,
  payload: imageData,
});
export const addImageSuccess = (image) => ({
  type: ADD_IMAGE_SUCCESS,
  payload: image,
});
export const addImageFailure = (error) => ({
  type: ADD_IMAGE_FAILURE,
  payload: error,
});

export const generateImageRequest = (details) => ({
  type: GENERATE_IMAGE_REQUEST,
  payload: details,
});
export const generateImageSuccess = (image) => ({
  type: GENERATE_IMAGE_SUCCESS,
  payload: image,
});
export const generateImageFailure = (error) => ({
  type: GENERATE_IMAGE_FAILURE,
  payload: error,
});

// Action creators for audio-related actions
export const fetchAudiosRequest = () => ({
  type: FETCH_AUDIOS_REQUEST,
});
export const fetchAudiosSuccess = (audios) => ({
  type: FETCH_AUDIOS_SUCCESS,
  payload: audios,
});
export const fetchAudiosFailure = (error) => ({
  type: FETCH_AUDIOS_FAILURE,
  payload: error,
});

export const addAudioRequest = (audioData) => ({
  type: ADD_AUDIO_REQUEST,
  payload: audioData,
});
export const addAudioSuccess = (audio) => ({
  type: ADD_AUDIO_SUCCESS,
  payload: audio,
});
export const addAudioFailure = (error) => ({
  type: ADD_AUDIO_FAILURE,
  payload: error,
});

export const generateAudioRequest = (details) => ({
  type: GENERATE_AUDIO_REQUEST,
  payload: details,
});
export const generateAudioSuccess = (audio) => ({
  type: GENERATE_AUDIO_SUCCESS,
  payload: audio,
});
export const generateAudioFailure = (error) => ({
  type: GENERATE_AUDIO_FAILURE,
  payload: error,
});
