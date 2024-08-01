import { call, put, takeLatest } from "redux-saga/effects";
import cafeService from "../../api/cafeService";
import { FETCH_CAFES_REQUEST } from "../actions/types";
import { fetchCafesSuccess } from "../actions/cafeActions";

function* fetchCafesSaga(action) {
  try {
    const cafes = yield call(cafeService.getCafes, action.payload);
    yield put(fetchCafesSuccess(cafes));
  } catch (error) {
    console.error(error);
  }
}

export function* watchFetchCafes() {
  yield takeLatest(FETCH_CAFES_REQUEST, fetchCafesSaga);
}
