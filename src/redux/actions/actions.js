// Action Types
// export const TOGGLE_THEME = 'TOGGLE_THEME';
export const GENERATE_STORY_REQUEST = 'GENERATE_STORY_REQUEST';
export const GENERATE_STORY_SUCCESS = 'GENERATE_STORY_SUCCESS';
export const GENERATE_STORY_FAILURE = 'GENERATE_STORY_FAILURE';
// Future expansion for image and audio
// export const GENERATE_IMAGE_REQUEST = 'GENERATE_IMAGE_REQUEST';
// export const GENERATE_IMAGE_SUCCESS = 'GENERATE_IMAGE_SUCCESS';
// export const GENERATE_IMAGE_FAILURE = 'GENERATE_IMAGE_FAILURE';
// export const GENERATE_AUDIO_REQUEST = 'GENERATE_AUDIO_REQUEST';
// export const GENERATE_AUDIO_SUCCESS = 'GENERATE_AUDIO_SUCCESS';
// export const GENERATE_AUDIO_FAILURE = 'GENERATE_AUDIO_FAILURE';

// Theme Action Creators
// export const toggleTheme = () => ({ type: TOGGLE_THEME });

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

// Image and Audio Action Creators
// Uncomment and implement these as you expand your application
// export const generateImageRequest = (details) => ({ ... });
// export const generateImageSuccess = (image) => ({ ... });
// export const generateImageFailure = (error) => ({ ... });
// export const generateAudioRequest = (details) => ({ ... });
// export const generateAudioSuccess = (audio) => ({ ... });
// export const generateAudioFailure = (error) => ({ ... });
