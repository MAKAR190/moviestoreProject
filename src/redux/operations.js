import axios from "axios";
import actions from "./actions";
import { fetchTrendingMovies } from "../services/fetch";
import selectors from "./selectors";
//*Axios Options
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: "4d7f0dbc7a1e37b54ef83cca4e8215e1",
};
//*Trending
const fetchTrending = () => (dispatch, getState) => {
  const movies = selectors.getTrending(getState());
  if (movies.length > 0) {
    return;
  }
  dispatch(actions.fetchTrendingRequest());
  fetchTrendingMovies()
    .then((res) => dispatch(actions.fetchTrendingSuccess(res.results)))
    .catch((error) => dispatch(actions.fetchTrendingError(error)));
};
const exports = {
  fetchTrending,
};
export default exports;
