import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_IMG_URL_W500 } from "../../utils/consts";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Link,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
const useStyles = makeStyles({
  card: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  cardMedia: {
    width: "100%",
    height: "100%",
    maxHeight: "300px",
    maxWidth: "300px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
});
const ReviewItem = ({ review }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        alt={review.author}
        image={`${
          review.author_details.avatar_path &&
          review.author_details.avatar_path.includes("https")
            ? review.author_details.avatar_path.replace("/", "")
            : BASE_IMG_URL_W500 + review.author_details.avatar_path
        }`}
        title={review.author}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h5">Nickname: {review.author}</Typography>
        <Link href={review.url} target="_blank" rel="noopener" variant="body2">
          {review.created_at.substr(2, 8)}
        </Link>
        <Typography
          dangerouslySetInnerHTML={{
            __html: review.content,
          }}
          variant="body1"
        />
        <Rating
          style={{
            marginTop: "10px",
          }}
          max={10}
          name="read-only"
          value={review.author_details.rating}
          readOnly
        />
      </CardContent>
    </Card>
  );
};

export default ReviewItem;
