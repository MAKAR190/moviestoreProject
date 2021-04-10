import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  spinner: {
    position: "fixed",
    left: 50 + "%",
    top: 50 + "%",
    transform: `translate(-50%,-50%)`,
  },
});
const Spinner = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.spinner} color="secondary" />;
};

export default Spinner;
