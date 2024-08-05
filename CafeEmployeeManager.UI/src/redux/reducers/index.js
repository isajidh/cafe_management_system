import { combineReducers } from "@reduxjs/toolkit";
import cafeReducer from "./cafeReducer";
import employeeReducer from "./employeeReducer";

const rootReducer = combineReducers({
  cafes: cafeReducer,
  employees: employeeReducer,
});

export default rootReducer;
