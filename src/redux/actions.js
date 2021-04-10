import { createAction } from "@reduxjs/toolkit";

//*Trending
const fetchTrendingRequest = createAction("trending/fetchTrendingRequest");
const fetchTrendingSuccess = createAction("trending/fetchTrendingSuccess");
const fetchTrendingError = createAction("trending/fetchTrendingError");

const actions = {
  fetchTrendingRequest,
  fetchTrendingSuccess,
  fetchTrendingError
};
export default actions;
