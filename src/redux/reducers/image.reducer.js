import {
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAILURE,
  GENERATE_IMAGE_REQUEST,
  GENERATE_IMAGE_SUCCESS,
  GENERATE_IMAGE_FAILURE,
  DELETE_IMAGE_REQUEST,
  DELETE_IMAGE_SUCCESS,
  DELETE_IMAGE_FAILURE,
} from "../actions/actions";

const initialImageState = {
  images: [],
  isLoading: false,
  error: null,
};

const imageReducer = (state = initialImageState, action) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        images: action.payload,
        error: null,
      };
    case FETCH_IMAGES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case ADD_IMAGE_REQUEST:
      return { ...state, isLoading: true };
    case ADD_IMAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        images: [...state.images, action.payload],
        error: null,
      };
    case ADD_IMAGE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case GENERATE_IMAGE_REQUEST:
      return { ...state, isLoading: true };
    case GENERATE_IMAGE_SUCCESS:
      // Assuming the payload includes the generated image data
      return {
        ...state,
        isLoading: false,
        images: [...state.images, action.payload],
        error: null,
      };
    case GENERATE_IMAGE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    case DELETE_IMAGE_REQUEST:
      return { ...state, isLoading: true };
    case DELETE_IMAGE_SUCCESS:
      // Assuming the payload includes the ID of the image to remove
      return {
        ...state,
        isLoading: false,
        images: state.images.filter((image) => image.id !== action.payload),
        error: null,
      };
    case DELETE_IMAGE_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

export default imageReducer;
