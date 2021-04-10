import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import logo from "../../tmdb2.0.png";
import routes from "../../routes";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: "#032541",
  },
  navItems: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: 50 + "%",
    margin: "0 auto",
  },
  logo: {
    width: 10 + "%",
    minWidth: "80px",
  },
  link: {
    textDecoration: "none",
    color: "#fafafa",
    marginRight: "10px",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const newRoutes = routes.slice(0, 2);
  return (
    <div className={classes.root}>
      <AppBar className={classes.nav} position="fixed">
        <Toolbar>
          <div className={classes.navItems}>
            <img className={classes.logo} src={logo} alt="logo" />
            <div>
              {newRoutes.map((route) => (
                <Link key={route.path} className={classes.link} to={route.path}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.link}
                  >
                    {route.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
