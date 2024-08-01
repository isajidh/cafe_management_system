import { all } from "redux-saga/effects";
import { watchFetchCafes } from "./cafeSagas";
import { watchFetchEmployees } from "./employeeSagas";

export default function* rootSaga() {
  yield all([watchFetchCafes(), watchFetchEmployees()]);
}
