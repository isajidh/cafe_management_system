import { FETCH_EMPLOYEES_REQUEST, FETCH_EMPLOYEES_SUCCESS } from "./types";

export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES_REQUEST,
});

export const fetchEmployeesSuccess = (employees) => ({
  type: FETCH_EMPLOYEES_SUCCESS,
  payload: employees,
});
