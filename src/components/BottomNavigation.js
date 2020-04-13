import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Upcoming" icon={<RestoreIcon />} />
      <BottomNavigationAction label="Past" icon={<DateRangeIcon />} />
      <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
