const initialState = {
  images: [], // Array of image objects
  isLoading: false,
  error: null,
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_IMAGES_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null, // Reset error state on new request
      };
    case "FETCH_IMAGES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        images: action.payload, // Update state with fetched images
      };
    case "FETCH_IMAGES_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload, // Capture any error
      };
    // Future implementation for other image-related actions
    default:
      return state;
  }
};

export default imageReducer;
