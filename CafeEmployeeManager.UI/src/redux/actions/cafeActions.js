import { FETCH_CAFES_REQUEST, FETCH_CAFES_SUCCESS } from "./types";

export const fetchCafes = (location) => ({
  type: FETCH_CAFES_REQUEST,
  payload: location,
});

export const fetchCafesSuccess = (cafes) => ({
  type: FETCH_CAFES_SUCCESS,
  payload: cafes,
});
