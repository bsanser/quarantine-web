import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import MenuIcon from "@material-ui/icons/Menu";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  logoButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-around"
  }
}));

const Header = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <BlurOnIcon
            className={classes.logoButton}
            fontSize="large"
            color="inherit"
            aria-label="logo"
            onClick={() => props.history.push("/home")}
          >
            <MenuIcon />
          </BlurOnIcon>
          <Typography variant="h6" className={classes.title}>
            Quarantining
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
