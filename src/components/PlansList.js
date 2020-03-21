import React from "react";
import PlanItem from "./PlanItem";

const PlanList = ({ plans }) => {
  return plans.map(plan => <PlanItem plan={plan} key={plan.id} />);
};
export default PlanList;
