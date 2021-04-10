import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
//*Trending
export const trendingReducer = createReducer([], {
  [actions.fetchTrendingSuccess]: (_, { payload }) => payload,
});
//!Errors
export const allErrorsReducer = createReducer(null, {
  [actions.fetchTrendingError]: (_, { payload }) => payload,
});
//?Loading
export const loadingReducer = createReducer(false, {
  [actions.fetchTrendingRequest]: () => true,
  [actions.fetchTrendingError]: () => false,
  [actions.fetchTrendingSuccess]: () => false,
});
