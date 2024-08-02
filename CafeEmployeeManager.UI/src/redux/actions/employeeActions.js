import {
  CREATE_EMPLOYEE_REQUEST,
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_WITH_CAFE_FAILURE,
  FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
  FETCH_EMPLOYEES_WITH_CAFE_SUCCESS,
} from "./types";

export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES_REQUEST,
});

export const fetchEmployeesSuccess = (employees) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});

export const fetchCafesFailure = (error) => ({
  type: FETCH_EMPLOYEES_FAILURE,
  payload: error,
});

export const addEmployee = (employee) => ({
  type: CREATE_EMPLOYEE_REQUEST,
  payload: employee,
});

export const fetchEmployeesWithCafe = (cafe) => ({
  type: FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
  payload: cafe,
});

export const fetchEmployeesWithCafeSuccess = (cafe) => ({
  type: FETCH_EMPLOYEES_WITH_CAFE_SUCCESS,
  payload: cafe,
});

export const fetchEmployeesWithCafeFailure = (error) => ({
  type: FETCH_EMPLOYEES_WITH_CAFE_FAILURE,
  payload: error,
});
