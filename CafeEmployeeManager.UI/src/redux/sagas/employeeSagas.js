import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchEmployeesSuccess,
  fetchEmployeesWithCafeFailure,
  fetchEmployeesWithCafeSuccess,
} from "../actions/employeeActions";
import employeeService from "../../api/employeeService";
import {
  FETCH_EMPLOYEES_REQUEST,
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
export function* watchFetchEmployees() {
  yield takeLatest(
    FETCH_EMPLOYEES_WITH_CAFE_REQUEST,
    fetchEmployeesWithCafeSaga
  );
}
