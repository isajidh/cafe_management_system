import { FETCH_CAFES_REQUEST, FETCH_CAFES_SUCCESS } from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const cafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAFES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CAFES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default cafeReducer;
