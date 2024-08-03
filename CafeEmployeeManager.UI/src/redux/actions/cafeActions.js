import {
  FETCH_CAFES_REQUEST,
  FETCH_CAFES_SUCCESS,
  FETCH_CAFES_FAILURE,
  CREATE_CAFE_REQUEST,
  CREATE_CAFE_SUCCESS,
  CREATE_CAFE_FAILURE,
  UPDATE_CAFE_REQUEST,
  UPDATE_CAFE_SUCCESS,
  UPDATE_CAFE_FAILURE,
} from "./types";

export const fetchCafes = (location) => ({
  type: FETCH_CAFES_REQUEST,
  payload: location,
});

export const fetchCafesSuccess = (cafes) => ({
  type: FETCH_CAFES_SUCCESS,
  payload: cafes,
});

export const fetchCafesFailure = (error) => ({
  type: FETCH_CAFES_FAILURE,
  payload: error,
});

export const createCafe = (cafe) => ({
  type: CREATE_CAFE_REQUEST,
  payload: cafe,
});

export const createCafeSuccess = (cafe) => ({
  type: CREATE_CAFE_SUCCESS,
  payload: cafe,
});

export const createCafeFailure = (error) => ({
  type: CREATE_CAFE_FAILURE,
  payload: error,
});

// Update cafe actions
export const updateCafe = (cafe) => ({
  type: UPDATE_CAFE_REQUEST,
  payload: cafe,
});

export const updateCafeSuccess = (cafe) => ({
  type: UPDATE_CAFE_SUCCESS,
  payload: cafe,
});

export const updateCafeFailure = (error) => ({
  type: UPDATE_CAFE_FAILURE,
  payload: error,
});
