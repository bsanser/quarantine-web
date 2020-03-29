import React from "react";
import { DateTimePicker } from "@material-ui/pickers";
import styled from "styled-components";

const StyledLabel = styled.label`
  color: grey;
  font-size: 21px;
`;

function BasicDateTimePicker({ date, handleChangeDate }) {
  let value;
  return (
    <DateTimePicker
      value={date}
      disablePast
      onChange={e => (value = e)}
      label={<StyledLabel>Date and time of the plan</StyledLabel>}
      showTodayButton
      onAccept={() => handleChangeDate(value)}
    />
  );
}

export default BasicDateTimePicker;
