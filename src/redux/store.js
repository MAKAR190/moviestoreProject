import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { trendingReducer, loadingReducer, allErrorsReducer } from "./reducers";
const root = combineReducers({
  trendingMovies: trendingReducer,
  loading: loadingReducer,
  errors: allErrorsReducer,
});
const store = configureStore({
  reducer: root,
});
export default store;
