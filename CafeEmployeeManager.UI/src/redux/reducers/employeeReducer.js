import { FETCH_EMPLOYEES_SUCCESS } from '../actions/types';

const initialState = {
  employees: [],
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
