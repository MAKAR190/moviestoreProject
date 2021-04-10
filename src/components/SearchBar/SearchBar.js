import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  input: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "20px",
  },
});
const Search = ({ submit }) => {
  const [value, setValue] = useState("");
  const classes = useStyles();
  const onSubmit = (e) => {
    e.preventDefault();
    submit(value);
  };
  return (
    <>
      <form className={classes.input} onSubmit={onSubmit}>
        <TextField
          onInput={(e) => setValue(e.target.value)}
          id="standard-basic"
          label="Search"
        />
      </form>
    </>
  );
};

export default Search;
