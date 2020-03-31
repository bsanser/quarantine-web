import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
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
  padding: 0 16px;
  margin-bottom: 16px;
`;

const StyledFormControl = styled(FormControl)`
  @media ${device.mobileM} {
    min-width: 120px;
  }
`;

const useStyles = makeStyles(theme => ({
  select: {
    background: "transparent"
  }
}));

const FiltersList = ({
  handleApplyFilter,
  handleFilterByToday,
  today,
  category,
  language
}) => {
  const classes = useStyles();
  return (
    <FiltersContainer>
      <Button
        variant={today === "all" ? "outlined" : "contained"}
        color="primary"
        name="today"
        onClick={handleFilterByToday}
      >
        Today
      </Button>
      <StyledFormControl variant="outlined">
        <InputLabel htmlFor="category-select">Category</InputLabel>
        <Select
          native
          value={category}
          onChange={handleApplyFilter}
          label="Category"
          inputProps={{
            name: "category",
            id: "outlined-category-native-simple"
          }}
          className={classes.select}
        >
          <option aria-label="None" value="all">
            All
          </option>
          {Object.keys(CATEGORIES).map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </Select>
      </StyledFormControl>
      <StyledFormControl variant="outlined">
        <InputLabel htmlFor="language-select">Language</InputLabel>
        <Select
          native
          value={language}
          onChange={handleApplyFilter}
          label="Language"
          inputProps={{
            name: "language",
            id: "outlined-language-native-simple"
          }}
          className={classes.select}
        >
          <option aria-label="None" value="all">
            All
          </option>
          {Object.keys(LANGUAGES).map(lang => (
            <option key={lang} value={lang}>
              {capitalizeString(lang)}
            </option>
          ))}
        </Select>
      </StyledFormControl>
    </FiltersContainer>
  );
};

export default FiltersList;
