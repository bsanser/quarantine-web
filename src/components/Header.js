import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import FaceIcon from "@material-ui/icons/Face";
import styled from "styled-components";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#2A344B"
  },
  logoButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

const BrandContainer = styled.div`
  display: flex;
`;
const Header = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <BrandContainer>
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
              Quarantening
            </Typography>
          </BrandContainer>

          <IconButton
            aria-label="delete"
            className={classes.margin}
            color="inherit"
          >
            <FaceIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
