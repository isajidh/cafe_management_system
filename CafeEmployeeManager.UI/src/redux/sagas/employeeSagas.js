import { call, put, takeLatest } from "redux-saga/effects";
import {
  addEmployeeFailure,
  addEmployeeSuccess,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,
  fetchAllEmployeesFailure,
  fetchEmployeesWithCafeFailure,
  fetchEmployeesWithCafeSuccess,
  updateEmployeeFailure,
  updateEmployeeSuccess,
} from "../actions/employeeActions";
import employeeService from "../../api/employeeService";
import {
  ADD_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
  FETCH_ALL_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
} from "../actions/types";

function* fetchAllEmployeesSaga() {
  try {
    const employees = yield call(employeeService.getAllEmployees);
    yield put(fetchEmployeesWithCafeSuccess(employees));
  } catch (error) {
    yield put(fetchAllEmployeesFailure(error.message));
  }
}

function* fetchEmployeesWithCafeSaga(action) {
  try {
    const employees = yield call(
      employeeService.getAllEmployeesWithCafe,
      action.payload
    );
    yield put(fetchEmployeesWithCafeSuccess(employees));
  } catch (error) {
    yield put(fetchEmployeesWithCafeFailure(error.message));
  }
}

function* createEmployeeSaga(action) {
  try {
    const newEmployee = yield call(
      employeeService.createEmployee,
      action.payload
    );
    yield put(addEmployeeSuccess(newEmployee));
    // Fetch employees again to update the list after adding new cafe
    yield put({ type: FETCH_ALL_EMPLOYEES_REQUEST });
  } catch (error) {
    yield put(addEmployeeFailure(error.message));
  }
}

function* updateEmployeeSaga(action) {
  try {
    const employee = yield call(employeeService.updateEmployee, action.payload);
    yield put(updateEmployeeSuccess(employee));
    // Fetch employees again to update the list after adding new cafe
    yield put({ type: FETCH_EMPLOYEES_WITH_CAFE_REQUEST });
    yield put({ type: FETCH_ALL_EMPLOYEES_REQUEST });
  } catch (error) {
    yield put(updateEmployeeFailure(error.message));
  }
}

function* deleteEmployeeSaga(action) {
  try {
    yield call(employeeService.deleteEmployee, action.payload);
    yield put(deleteEmployeeSuccess(action.payload));
    // Fetch employees again to update the list after adding new cafe
    yield put({ type: FETCH_ALL_EMPLOYEES_REQUEST });
  } catch (error) {
    yield put(deleteEmployeeFailure(error.message));
  }
}

export function* watchFetchEmployees() {
  yield takeLatest(FETCH_ALL_EMPLOYEES_REQUEST, fetchAllEmployeesSaga);
  yield takeLatest(
    FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
    fetchEmployeesWithCafeSaga
  );
  yield takeLatest(ADD_EMPLOYEE_REQUEST, createEmployeeSaga);
  yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
}
