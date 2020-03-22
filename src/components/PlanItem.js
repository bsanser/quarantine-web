import React from "react";
import Microlink from "@microlink/react";
import styled from "styled-components";

const StyledMicrolink = styled(Microlink)`
  border-radius: 8px;
  border: none;
`;

const PlanItem = ({ plan }) => {
  return (
    <StyledMicrolink
      url={plan.link}
      size="large"
      author={plan.host}
      media="video"
      contrast
    />
  );
};

export default PlanItem;
