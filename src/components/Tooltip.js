import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";



export default function SimpleTooltip({ title }) {
  return (
    <div>
      <Tooltip title={title} aria-label="add">
      <AddIcon/>
      </Tooltip>
    </div>
  );
}
