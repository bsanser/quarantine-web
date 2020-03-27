import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black
  },
  tooltip: {
    backgroundColor: theme.palette.common.black
  }
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return (
    <Tooltip
      arrow
      classes={classes}
      disableFocusListener
      {...props}
    />
  );
}
const CustomTooltip = ({ title, children }) => {
  return (
    <div>
      <BootstrapTooltip title={title}>{children}</BootstrapTooltip>
    </div>
  );
};

export default CustomTooltip;
