import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  typography: {
    textAlign: "center",
    padding: "10px",
    marginTop: "6%",
  },
});
const Layout = ({ title }) => {
  const classes = useStyles();
  return (
    <Typography className={classes.typography} variant="h2">
      {title}
    </Typography>
  );
};

export default Layout;
