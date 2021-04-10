import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { Link } from "react-router-dom";
import { BASE_IMG_URL_W500, IMG_NOT_FOUND } from "../../../utils/consts";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function MovieItem({ movie, loading }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`movies/${movie.id}`}>
        {loading ? (
          <Skeleton animation="wave" variant="rect" width={410} height={188} />
        ) : (
          <CardMedia
            component="img"
            alt={movie.title}
            image={`${
              movie.backdrop_path
                ? BASE_IMG_URL_W500 + movie.backdrop_path
                : IMG_NOT_FOUND
            }`}
            title={movie.title}
          />
        )}

        <CardContent>
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            <Typography gutterBottom variant="h5" component="h2">
              {movie.original_title || movie.name}
            </Typography>
          )}
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            <Typography gutterBottom variant="body2" component="p">
              {movie.release_date || movie.first_air_date}
            </Typography>
          )}
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            <Typography variant="body1" color="textSecondary" component="p">
              {movie.overview.length > 0
                ? movie.overview.substr(0, 200) + "..."
                : "There is no overview to this movie"}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        {loading ? (
          <Skeleton variant="rect" width={80} height={24} />
        ) : (
          <Button
            component={Link}
            to={`movies/${movie.id}`}
            size="small"
            color="primary"
          >
            Read More
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
