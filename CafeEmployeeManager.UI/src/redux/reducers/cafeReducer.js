import { FETCH_CAFES_SUCCESS } from '../actions/types';

const initialState = {
  cafes: [],
};

const cafeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CAFES_SUCCESS:
      return {
        ...state,
        cafes: action.payload,
      };
    default:
      return state;
  }
};

export default cafeReducer;
