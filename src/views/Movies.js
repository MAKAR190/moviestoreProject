import React, { Component } from "react";
import { fetchMovieByQuery } from "../services/fetch";
import queryString from "query-string";
import SearchBar from "../components/SearchBar/SearchBar";
import Layout from "../components/Layout/Layout";
import MoviesList from "../components/MoviesList/MoviesList";
import Alert from "@material-ui/lab/Alert";
import Pagination from "../components/Pagination/Pagination";
import { Typography } from "@material-ui/core";
import Spinner from "../components/Spinner/Spinner";
const INITIAL_STATE = {
  movies: [],
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
  notFoundMessage: false,
};
export default class Movies extends Component {
  state = {
    movies: [],
    page: 1,
    totalPages: 0,
    loading: false,
    error: null,
    notFoundMessage: false,
  };
  componentDidMount() {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query } = getCategoryFromProps(this.props.location.search);
    const { page } = getCategoryFromProps(this.props.location.search);
    if (query) {
      this.handleSubmit(query, page);
      this.setState({ page });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query: prevQuery } = getCategoryFromProps(
      prevProps.location.search
    );
    const { query: nextQuery } = getCategoryFromProps(
      this.props.location.search
    );
    const { page: prevPage } = getCategoryFromProps(prevProps.location.search);
    const { page: nextPage } = getCategoryFromProps(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.handleSubmit(nextQuery, 1);
    }
    if (prevPage !== nextPage) {
      this.handleSubmit(nextQuery, nextPage);
      this.setState({ page: nextPage });
    }
    if (prevState.movies !== this.state.movies) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  handleSubmit = (query, page) => {
    if (query !== undefined) {
      this.setState({ loading: true });
      fetchMovieByQuery(query, page)
        .then((data) => {
          this.setState({
            movies: data.results,
            totalPages: data.total_pages,
            page: data.page,
          });
        })
        .catch((err) => this.setState({ error: err }))
        .finally(() => {
          if (this.state.movies.length <= 0) {
            this.setState({
              notFoundMessage: true,
              loading: false,
              error: null,
            });
          } else {
            this.setState({
              loading: false,
              notFoundMessage: false,
              error: null,
            });
          }
        });
    } else {
      this.setState({
        ...INITIAL_STATE,
      });
    }
  };
  handleFormSubmit = (value) => {
    if (value.length > 0) {
      this.props.history.push({
        ...this.props.location,
        search: `page=${1}&query=${value}`,
      });
    }
  };
  changePage = (page) => {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query } = getCategoryFromProps(this.props.location.search);
    this.setState({
      page: page,
    });
    this.props.history.push({
      ...this.props.location,
      search: `page=${page}&query=${query}`,
    });
  };

  render() {
    const {
      movies,
      loading,
      error,
      totalPages,
      page,
      notFoundMessage,
    } = this.state;
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query } = getCategoryFromProps(this.props.location.search);
    return (
      <>
        <Layout title={query ? `Results for "${query}"` : "Movies Page"} />
        <SearchBar submit={this.handleFormSubmit} />

        <MoviesList movies={movies} loading={loading} />

        {movies.length > 0 && (
          <Pagination
            page={Number(page)}
            changePage={this.changePage}
            count={totalPages}
          />
        )}
        {notFoundMessage && (
          <Typography align="center" variant="h6">
            Nothing Found
          </Typography>
        )}

        {error && (
          <Alert variant="filled" severity="error">
            Something went wrong...
          </Alert>
        )}
        {loading && <Spinner />}
      </>
    );
  }
}
