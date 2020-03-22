import React from "react";
import PlanItem from "./PlanItem";
import styled from "styled-components";
import { device } from "./../styles/breakpoints";

const Wrapper = styled.div`
  display: grid;
  padding: 16px;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  @media ${device.tablet} {
    grid-row: ${({ isTall }) => (isTall ? "span 2 / auto" : "auto")};
    grid-column: ${({ isWide }) => (isWide ? "span 2 / auto" : "auto")};
  }
  @media ${device.laptop} {
    grid-column: ${({ isTall }) => (isTall ? "span 2 / auto" : "auto")};
    grid-column: ${({ isWide }) => (isWide ? "span 2 / auto" : "auto")};
  }
`;

// const tallCardPositions = [0, 1];
// const wideCardPositions = [0, 6];

const PlanList = ({ plans }) => {
  return (
    <Wrapper>
      {plans.map((plan, index) => (
        <PlanItem plan={plan} key={plan.id} />
      ))}
    </Wrapper>
  );
};
export default PlanList;
