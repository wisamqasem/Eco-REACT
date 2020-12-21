import {
  UPLOADING_START,
  UPLOADING_SUCCESS,
  UPLOADING_FAIL,
  UPLOADING,
  GET_DATA
} from "./types";

const initialState = {
  error: null,
  percent: null,
  showProgress: false,
  image: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOADING_START:
      return {
        ...state

      };
    case UPLOADING_SUCCESS:
      return {
        ...state,
        error: false

      };
    case UPLOADING_FAIL:
      return {
        ...state,
        error: action.payload

      };
    case UPLOADING:
      return {
        ...state,

      };

    case GET_DATA:
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
}
