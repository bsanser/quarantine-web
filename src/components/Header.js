import React, { useState } from "react";
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

import LoginDialog from "./LoginDialog";
import { AuthContext } from "./../contexts/AuthContext";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleModalClose = () => setModalOpen(false);
  const handleMenu = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AuthContext.Consumer>
      {context => {
        const { user, onUserChange, isAuthenticated } = context;
        console.log(isAuthenticated());
        console.log(user);
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

                {isAuthenticated() ? (
                  <div>
                    <span>Hi, {user.name}</span>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
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
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
                ) : (
                  <IconButton
                    aria-label="delete"
                    className={classes.margin}
                    color="inherit"
                  >
                    <FaceIcon onClick={() => setModalOpen(true)} />
                  </IconButton>
                )}
              </Toolbar>
            </AppBar>
            <LoginDialog
              isOpen={isModalOpen}
              handleClose={handleModalClose}
            ></LoginDialog>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default withRouter(Header);
