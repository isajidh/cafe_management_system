import { call, put, takeLatest } from "redux-saga/effects";
import cafeService from "../../api/cafeService";
import {
  CREATE_CAFE_FAILURE,
  CREATE_CAFE_REQUEST,
  CREATE_CAFE_SUCCESS,
  FETCH_CAFES_REQUEST,
  UPDATE_CAFE_REQUEST,
} from "../actions/types";
import {
  fetchCafesSuccess,
  updateCafeSuccess,
  updateCafeFailure,
} from "../actions/cafeActions";

function* fetchCafesSaga(action) {
  try {
    const cafes = yield call(cafeService.getCafes, action.payload);
    yield put(fetchCafesSuccess(cafes));
  } catch (error) {
    console.error(error);
  }
}
function* createCafeSaga(action) {
  try {
    const newCafe = yield call(cafeService.createCafe, action.payload);
    yield put({ type: CREATE_CAFE_SUCCESS, payload: newCafe });
    // Fetch cafes again to update the list after adding new cafe
    yield put({ type: FETCH_CAFES_REQUEST });
  } catch (error) {
    yield put({ type: CREATE_CAFE_FAILURE, payload: error.message });
  }
}

function* updateCafeSaga(action) {
  try {
    const response = yield call(cafeService.updateCafe, action.payload);
    yield put(updateCafeSuccess(response.data));
    yield put(fetchCafesSuccess()); // Refetch cafes to update the list
  } catch (error) {
    yield put(updateCafeFailure(error.message));
  }
}

export function* watchFetchCafes() {
  yield takeLatest(FETCH_CAFES_REQUEST, fetchCafesSaga);
  yield takeLatest(CREATE_CAFE_REQUEST, createCafeSaga);
  yield takeLatest(UPDATE_CAFE_REQUEST, updateCafeSaga);
}
