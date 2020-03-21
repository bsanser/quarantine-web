import React from "react";
import { ReactTinyLink } from "react-tiny-link";

const PlanItem = ({ plan }) => {
  return (
    <ReactTinyLink
      cardSize="small"
      showGraphic={true}
      maxLine={2}
      minLine={1}
      url={plan.link}
    />
  );
};

export default PlanItem;
