import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MovieItem from "./MovieItem/MovieItem";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
}));
const MoviesList = ({ movies, loading }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root} spacing={3}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {movies.map((movie) => (
            <Grid key={movie.id} item>
              <MovieItem loading={loading} movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MoviesList;
