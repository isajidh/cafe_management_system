import {
  FETCH_EMPLOYEES_FAILURE,
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_WITH_CAFE_FAILURE,
  FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
  FETCH_EMPLOYEES_WITH_CAFE_SUCCESS,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAILURE,
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

//Employee page load
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

//Add Employee Actions
export const addEmployeeRequest = (employeeData) => ({
  type: ADD_EMPLOYEE_REQUEST,
  payload: employeeData,
});

export const addEmployeeSuccess = (employee) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const addEmployeeFailure = (error) => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload: error,
});

//Update Employee Actions
export const updateEmployeeRequest = (employee) => ({
  type: UPDATE_EMPLOYEE_REQUEST,
  payload: employee,
});

export const updateEmployeeSuccess = (employee) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const updateEmployeeFailure = (error) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});

//Delete Employee Actions
export const deleteEmployeeRequest = (employeeId) => ({
  type: DELETE_EMPLOYEE_REQUEST,
  payload: employeeId,
});

export const deleteEmployeeSuccess = (employee) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: employee,
});

export const deleteEmployeeFailure = (error) => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload: error,
});
