import { call, put, takeLatest } from "redux-saga/effects";
import cafeService from "../../api/cafeService";
import {
  CREATE_CAFE_REQUEST,
  FETCH_CAFES_REQUEST,
  UPDATE_CAFE_REQUEST,
  DELETE_CAFE_REQUEST,
} from "../actions/types";
import {
  fetchCafesSuccess,
  updateCafeFailure,
  deleteCafeSuccess,
  deleteCafeFailure,
  fetchCafesFailure,
  createCafeSuccess,
  createCafeFailure,
} from "../actions/cafeActions";

function* fetchCafesSaga(action) {
  try {
    const cafes = yield call(cafeService.getCafes, action.payload);
    yield put(fetchCafesSuccess(cafes));
  } catch (error) {
    yield put(fetchCafesFailure(error.message));
  }
}

function* createCafeSaga(action) {
  try {
    const cafe = yield call(cafeService.createCafe, action.payload);
    yield put(fetchCafesSuccess(cafe));
    yield put({ type: FETCH_CAFES_REQUEST }); // Re-fetch cafes to update the list
  } catch (error) {
    yield put(createCafeFailure(error.message));
  }
}

function* updateCafeSaga(action) {
  try {
    yield call(cafeService.updateCafe, action.payload);
    yield put(createCafeSuccess(action.payload));
    yield put({ type: FETCH_CAFES_REQUEST }); // Re-fetch cafes to update the list
  } catch (error) {
    yield put(updateCafeFailure(error.message));
  }
}

function* deleteCafeSaga(action) {
  try {
    yield call(cafeService.deleteCafe, action.payload);
    yield put(deleteCafeSuccess(action.payload));
    yield put({ type: FETCH_CAFES_REQUEST }); // Refetch cafes to update the list
  } catch (error) {
    yield put(deleteCafeFailure(error.message));
  }
}

export function* watchFetchCafes() {
  yield takeLatest(FETCH_CAFES_REQUEST, fetchCafesSaga);
  yield takeLatest(CREATE_CAFE_REQUEST, createCafeSaga);
  yield takeLatest(UPDATE_CAFE_REQUEST, updateCafeSaga);
  yield takeLatest(DELETE_CAFE_REQUEST, deleteCafeSaga);
}
