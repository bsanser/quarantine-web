import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import MenuItem from "@material-ui/core/MenuItem";

import { DatePicker } from "@material-ui/pickers";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { device } from "./../styles/breakpoints";

import CATEGORIES from "./../constants/categories";
import LANGUAGES from "./../constants/languages";
import { capitalizeString } from "./../utils/string-utils";

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const StyledFormControl = styled(FormControl)`
  @media ${device.mobileM} {
    min-width: 120px;
  }
`;

const useStyles = makeStyles((theme) => ({
  select: {
    background: "transparent",
  },
}));

const FiltersList = ({
  handleApplyFilter,
  handleChangeDate,
  category,
  language,
  from,
}) => {
  const classes = useStyles();
  return (
    <FiltersContainer>
      <DatePicker
        value={from}
        inputVariant="outlined"
        disablePast
        onChange={handleChangeDate}
        label="Date"
        clearable
      />

      <StyledFormControl variant="outlined">
        <InputLabel id="outlined-category-native-simple">Category</InputLabel>
        <Select
          value={category}
          onChange={handleApplyFilter}
          label="Category"
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple",
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {Object.keys(CATEGORIES).map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      <StyledFormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={language}
          onChange={handleApplyFilter}
          label="Language"
          inputProps={{
            name: "language",
            id: "outlined-language-native-simple",
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {Object.keys(LANGUAGES).map((lang) => (
            <MenuItem key={lang} value={lang}>
              {capitalizeString(lang)}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </FiltersContainer>
  );
};

export default FiltersList;
