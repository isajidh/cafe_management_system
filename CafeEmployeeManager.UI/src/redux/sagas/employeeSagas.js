import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEmployeesSuccess,
  fetchEmployeesWithCafeFailure,
  fetchEmployeesWithCafeSuccess,
} from "../actions/employeeActions";
import employeeService from "../../api/employeeService";
import {
  ADD_EMPLOYEE_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
} from "../actions/types";

function* fetchEmployeesSaga() {
  try {
    const employees = yield call(employeeService.getEmployeesWithCafe);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error) {
    console.error(error);
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
    const newCafe = yield call(employeeService.createEmployee, action.payload);
    yield put({ type: ADD_EMPLOYEE_SUCCESS, payload: newCafe });
    // Fetch cafes again to update the list after adding new cafe
    yield put({ type: ADD_EMPLOYEE_REQUEST });
  } catch (error) {
    yield put({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
  }
}

export function* watchFetchEmployees() {
  yield takeLatest(
    FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
    fetchEmployeesWithCafeSaga
  );
  yield takeLatest(ADD_EMPLOYEE_REQUEST, createEmployeeSaga);
}
