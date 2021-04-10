import Paginationn from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  pagination: {
    display: "flex",
    justifyContent: "center",
    margin: "35px",
  },
});
const Pagination = ({ count, changePage, page }) => {
  const classes = useStyles();
  const handleChange = (event, value) => {
    changePage(value);
  };
  return (
    <Paginationn
      className={classes.pagination}
      count={count}
      variant="outlined"
      color="primary"
      page={page}
      onChange={handleChange}
    />
  );
};

export default Pagination;
