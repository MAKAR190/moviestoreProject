import {
  CardMedia,
  Typography,
  Card,
  Grid,
  Box,
  Link,
} from "@material-ui/core";
import { BASE_IMG_URL, IMG_NOT_FOUND } from "../../utils/consts";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import Rating from "@material-ui/lab/Rating";
import Tabs from "./Tabs";
export const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "80%",
    margin: "0 auto",
    padding: "20px",
    minWidth: "800px",
  },
  poster: {
    width: "30%",
    marginRight: "20px",
  },
  forCountries: {
    background: "#9AF89D",
    display: "inline-block",
    borderRadius: "5px",
    color: "#444dd4",
    marginRight: "5px",
    marginLeft: "5px",
    padding: "2px",
    fontSize: "12px",
    marginTop: "5px",
  },
  typography: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "5px",
  },
  forGenres: {
    background: "#03DAFF",
    display: "inline-block",
    borderRadius: "5px",
    marginRight: "5px",
    marginLeft: "5px",
    padding: "2px",
    fontSize: "12px",
    marginTop: "5px",
    color: "#fafafa",
  },
  forCompanies: {
    background: "#FFA603",
    display: "inline-block",
    borderRadius: "5px",
    marginRight: "5px",
    marginLeft: "5px",
    padding: "2px",
    fontSize: "12px",
    marginTop: "5px",
    color: "#fafafa",
  },
});
const MoviePage = ({ movie, loading }) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.wrapper}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" width={410} height={588} />
        ) : (
          <CardMedia
            className={classes.poster}
            component="img"
            alt={movie.title}
            image={
              movie.poster_path && movie.backdrop_path
                ? `${
                    movie.poster_path
                      ? BASE_IMG_URL + movie.poster_path
                      : BASE_IMG_URL + movie.backdrop_path
                  }`
                : IMG_NOT_FOUND
            }
            title={movie.title}
          />
        )}
        <Grid>
          <Typography className={classes.typography} variant="h5">
            {movie.tagline || movie.title}
          </Typography>

          <Typography className={classes.typography} variant="body2">
            {movie.release_date || movie.first_air_date}
          </Typography>
          <Typography className={classes.typography} variant="body1">
            {movie.overview}
          </Typography>
          <Typography className={classes.typography} variant="h6">
            Status: {movie.status}
          </Typography>
          {movie.homepage && (
            <Link
              target="_blank"
              rel="noopener"
              variant="h6"
              href={movie.homepage}
            >
              Homepage
            </Link>
          )}
          {movie.production_countries.length > 0 && (
            <Typography className={classes.typography} variant="h6">
              {movie.production_countries.length > 1
                ? "Countries: "
                : "Country: "}
              {movie.production_countries.map((country) => (
                <Box key={country.name} className={classes.forCountries}>
                  {country.name}
                </Box>
              ))}
            </Typography>
          )}
          {movie.production_companies.length > 0 && (
            <Typography className={classes.typography} variant="h6">
              {movie.production_companies.length > 1
                ? "Companies: "
                : "Company: "}
              {movie.production_companies.map((company) => (
                <Box key={company.name} className={classes.forCompanies}>
                  {company.name}
                </Box>
              ))}
            </Typography>
          )}
          {movie.genres.length > 0 && (
            <Typography className={classes.typography} variant="h6">
              {movie.genres.length > 1 ? "Genres: " : "Genre: "}
              {movie.genres.map((company) => (
                <Box key={company.name} className={classes.forGenres}>
                  {company.name}
                </Box>
              ))}
            </Typography>
          )}

          <Rating
            style={{
              marginTop: "10px",
            }}
            max={10}
            name="read-only"
            value={movie.vote_average}
            readOnly
          />
        </Grid>
      </Card>
      <Tabs movie={movie} />
    </>
  );
};

export default MoviePage;
