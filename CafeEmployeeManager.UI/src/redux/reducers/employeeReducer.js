import {
  DELETE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEES_WITH_CAFE_SUCCESS,
} from "../actions/types";
import { ADD_EMPLOYEE_REQUEST } from "../actions/types";
import { ADD_EMPLOYEE_FAILURE } from "../actions/types";
import { FETCH_EMPLOYEES_WITH_CAFE_FAILURE } from "../actions/types";
import { FETCH_EMPLOYEES_WITH_CAFE_REQUEST } from "../actions/types";
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case FETCH_EMPLOYEES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_EMPLOYEES_WITH_CAFE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EMPLOYEES_WITH_CAFE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: action.payload,
      };
    case FETCH_EMPLOYEES_WITH_CAFE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employees: state.employees.map((emp) =>
          emp.id === action.payload.id ? action.payload : emp
        ),
      };
    case UPDATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default employeeReducer;
