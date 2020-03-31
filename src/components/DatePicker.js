import React from "react";
import { DateTimePicker } from "@material-ui/pickers";

function BasicDateTimePicker({ date, handleChangeDate }) {
  let value;
  return (
    <DateTimePicker
      value={date}
      inputVariant="outlined"
      disablePast
      onChange={e => (value = e)}
      label="Date and time of the plan"
      showTodayButton
      onAccept={() => handleChangeDate(value)}
    />
  );
}

export default BasicDateTimePicker;
