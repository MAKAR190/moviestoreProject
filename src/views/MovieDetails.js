import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import MoviePage from "../components/MoviePage/MoviePage";
import Alert from "@material-ui/lab/Alert";
import { fetchMovieById } from "../services/fetch";
import Spinner from "../components/Spinner/Spinner";
class MovieDetails extends Component {
  state = {
    movie: null,
    error: null,
    loading: false,
    notFound: false,
  };
  componentDidMount() {
    const { match } = this.props;
    this.setState({
      loading: true,
    });
    fetchMovieById(match.params.id)
      .then((res) =>
        this.setState({
          movie: res,
        })
      )
      .catch((error) => this.setState({ error: error.message }))
      .finally(() => {
        if (!this.state.movie) {
          this.setState({
            notFound: true,
            loading: false,
            error: null,
          });
        }
        this.setState({ loading: false, error: null });
      });
  }

  render() {
    const { movie, error, loading, notFound } = this.state;
    return (
      <>
        {movie && (
          <>
            <Layout title={movie.original_title || movie.name || movie.title} />
            <MoviePage loading={loading} movie={movie} />
          </>
        )}
        {notFound && <Layout title="Not Found" />}
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

export default MovieDetails;
