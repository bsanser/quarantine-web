import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import BlurOnIcon from "@material-ui/icons/BlurOn";
import MenuIcon from "@material-ui/icons/Menu";
import FaceIcon from "@material-ui/icons/Face";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";

import { AuthContext } from "./../contexts/AuthContext";
import AuthService from "./../services/AuthService";

const useStyles = makeStyles(theme => ({
  appBar: {
    padding: "0 16px"
  },
  logoButton: {
    marginRight: theme.spacing(2)
  },
  faceButton: {
    paddingRight: "0"
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0"
  }
}));

const BrandContainer = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  color: white;
  text-decoration: none;
`;

const Header = ({ context, ...props }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const { user, onUserChange, isAuthenticated } = context;
  useEffect(() => {
    AuthService.getCurrentUser().then(user => onUserChange(user.data));
  }, [onUserChange]);
  const handleLogout = () => {
    AuthService.logout().then(user => onUserChange(user));
  };

  return (
    <AppBar position="static" className={classes.appBar}>
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
            Quarantining
          </Typography>
        </BrandContainer>

        {isAuthenticated() ? (
          <div>
            <span>Hi, {user.name}</span>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.faceButton}
            >
              <FaceIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={isMenuOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>My favourites</MenuItem>
              <MenuItem onClick={handleClose}>Plans I suggested</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <StyledButton as="a" href="/auth/google" color="inherit">
            Login with Google
          </StyledButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(
  React.forwardRef((props, ref) => (
    <AuthContext.Consumer>
      {context => <Header {...props} context={context} ref={ref} />}
    </AuthContext.Consumer>
  ))
);
