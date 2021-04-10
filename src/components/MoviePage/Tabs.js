import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { fetchCast, fetchReviews } from "../../services/fetch";
import CastItem from "./CastItem";
import ReviewItem from "./ReviewItem";
import { Typography, Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    marginTop: "10px",
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function SimpleTabs({ movie }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [cast, setCast] = React.useState(null);
  const [reviews, setReviews] = React.useState(null);
  const [sort, setSort] = React.useState("");

  const handleSortChange = (e) => {
    const { target } = e;
    setSort(target.value);
  };
  useEffect(() => {
    fetchCast(movie.id).then(({ cast }) => setCast(cast));
    fetchReviews(movie.id).then(({ results }) => setReviews(results));
  }, [movie.id]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  function getUnixDate(date) {
    const newDate = new Date(date).getTime();
    return newDate;
  }
  function sortReviews(reviews) {
    switch (sort) {
      case "":
        return reviews.sort(
          (a, b) => getUnixDate(a.created_at) - getUnixDate(b.created_at)
        );
      case "rating":
        return reviews.sort(
          (a, b) => b.author_details.rating - a.author_details.rating
        );
      case "created_at":
        return reviews.sort(
          (a, b) => getUnixDate(b.created_at) - getUnixDate(a.created_at)
        );
      default:
        return reviews;
    }
  }
  return (
    <div className={classes.root}>
      <AppBar className={classes.tabs} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Cast" {...a11yProps(0)} />
          <Tab label="Reviews" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {cast && cast.length > 1 ? (
                cast.map((actor) => (
                  <Grid key={actor.id} item>
                    <CastItem actor={actor} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h4">
                  There is no info about cast at the moment
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {reviews && reviews.length > 1 && (
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sort}
              onChange={handleSortChange}
            >
              <MenuItem value={""}>No sort</MenuItem>
              <MenuItem value={"rating"}>Rating</MenuItem>
              <MenuItem value={"created_at"}>Newest</MenuItem>
            </Select>
          </FormControl>
        )}

        <Grid container className={classes.root} spacing={3}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {reviews && reviews.length > 0 ? (
                sortReviews(reviews).map((review) => (
                  <Grid key={review.id} item>
                    <ReviewItem review={review} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h4">No reviews at the moment</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
    </div>
  );
}
