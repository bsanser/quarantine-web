import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import DateRangeIcon from "@material-ui/icons/DateRange";

const useStyles = makeStyles({
  root: {
    width: "100%",
    bottom: 0,
    position: "fixed",
  },
});

const BottomNav = () => {
  const classes = useStyles();
  const { pathname } = useLocation();
  // TO DO: Refactor
  const paths = ["/home", "/plans/all", "/plans/liked"];
  const value = paths.indexOf(pathname);
  return (
    <BottomNavigation value={value} showLabels className={classes.root}>
      <BottomNavigationAction
        label="Upcoming"
        icon={<RestoreIcon />}
        component={Link}
        to="/home"
      />
      <BottomNavigationAction
        label="All"
        icon={<DateRangeIcon />}
        component={Link}
        to="/plans/all"
      />
      <BottomNavigationAction
        label="Favorites"
        icon={<FavoriteIcon />}
        component={Link}
        to="/plans/liked"
      />
      />
    </BottomNavigation>
  );
};

export default BottomNav;
