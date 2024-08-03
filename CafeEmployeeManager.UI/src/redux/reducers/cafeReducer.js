import { UPDATE_CAFE_REQUEST } from "../actions/types";
import { UPDATE_CAFE_FAILURE } from "../actions/types";
import { UPDATE_CAFE_SUCCESS } from "../actions/types";
import { FETCH_CAFES_FAILURE } from "../actions/types";
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
    case FETCH_CAFES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_CAFE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        cafes: state.cafes.map((cafe) =>
          cafe.id === action.payload.id ? action.payload : cafe
        ),
      };
    case UPDATE_CAFE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cafeReducer;
