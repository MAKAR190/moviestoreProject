import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {
  api_key: "4d7f0dbc7a1e37b54ef83cca4e8215e1",
};
export const fetchTrendingMovies = () => {
  return axios.get("/trending/all/day").then((res) => res.data);
};
export const fetchMovieById = (id) => {
  return axios.get(`/movie/${id}`).then((res) => res.data);
};
export const fetchMovieByQuery = (query, page) => {
  return axios
    .get(`search/movie?query=${query}&page=${page}`)
    .then((res) => res.data);
};
export const fetchCast = (id) => {
  return axios.get(`/movie/${id}/credits`).then((res) => res.data);
};
export const fetchReviews = (movieId) => {
  return axios
    .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`)
    .then((res) => res.data);
};
