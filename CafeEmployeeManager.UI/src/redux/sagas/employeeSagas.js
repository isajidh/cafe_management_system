import { call, put, takeLatest } from "redux-saga/effects";
import { fetchEmployeesSuccess } from "../actions/employeeActions";
import employeeService from "../../api/employeeService";
import { FETCH_EMPLOYEES_REQUEST } from "../actions/types";

function* fetchEmployeesSaga() {
  try {
    const employees = yield call(employeeService.getEmployees);
    yield put(fetchEmployeesSuccess(employees));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchEmployees() {
  yield takeLatest(FETCH_EMPLOYEES_REQUEST, fetchEmployeesSaga);
}
