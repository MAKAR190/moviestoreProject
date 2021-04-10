import React, { Component } from "react";
import Layout from "../components/Layout/Layout";
import { connect } from "react-redux";
import selectors from "../redux/selectors";
import operations from "../redux/operations";
import MoviesList from "../components/MoviesList/MoviesList";
class Home extends Component {
  componentDidMount() {
    this.props.fetchTrending();
  }

  render() {
    const { trending, loading } = this.props;
    return (
      <>
        <Layout title="Trending today" />
        <MoviesList movies={trending} loading={loading} />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  trending: selectors.getTrending(state),
  loading: selectors.getLoading(state),
});
const mapDispatchToProps = {
  fetchTrending: operations.fetchTrending,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
