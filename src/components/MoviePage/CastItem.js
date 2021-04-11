import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_IMG_URL_W500, IMG_NOT_FOUND_CAST } from "../../utils/consts";
import { Card, CardMedia, Typography, CardContent } from "@material-ui/core";
const useStyles = makeStyles({
  card: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    maxWidth: "500px",
  },
  cardMedia: {
    width: "30%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
  },
});
const CastItem = ({ actor }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        alt={actor.name}
        image={`${
          actor.profile_path
            ? BASE_IMG_URL_W500 + actor.profile_path
            : IMG_NOT_FOUND_CAST
        }`}
        title={actor.name}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h6">Name: {actor.name}</Typography>
        <Typography variant="body1">Character: {actor.character}</Typography>
      </CardContent>
    </Card>
  );
};

export default CastItem;
