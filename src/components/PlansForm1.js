import React, { useState } from "react";
import { device } from "./../styles/breakpoints";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import DatePicker from "./DatePicker";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CATEGORIES from "./../constants/categories";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import { Redirect } from "react-router-dom";
import {
  replaceSpaceWithHyphens,
  capitalizeString
} from "./../utils/string-utils";

import PlansService from "./../services/PlansService";
import languages from "./../constants/languages";

const Container = styled.div`
  height: 100vh;
  padding: 32px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  @media ${device.tablet} {
    width: 400px;
    padding: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  color: white;
  margin: 0 auto;
  padding-top: 12px;
`;

const FormHeader = styled.h1`
  font-size: 20px;
  color: black;
  margin-bottom: 16px;
`;

const StyledInputLabel = styled(InputLabel)`
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0, 0.54);
  font-size: 14px;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 0, 0, 0.23);

  border-radius: 4px;
  padding: 18.5px 14px;

  > div {
    padding: 2px;
    margin-right: 4px;
    margin-bottom: 4px;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin-right: 10px;
  }
`;

const StyledSelect = styled(Select)`
  border: 1px solid rgba(0, 0, 0, 0.23);
  border-radius: 4px;
  padding: 10px 8px;
  margin-bottom: 16px;
`;

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    marginBottom: "16px"
  },
  datePicker: {
    border: "1px solid grey",
    borderRadius: "4px"
  }
}));

const PlansForm = props => {
  const classes = useStyles();
  const urlInfo = props.location.state;
  const [title, setTitle] = useState((urlInfo && urlInfo.title) || "");
  const [description, setDescription] = useState(
    (urlInfo && urlInfo.description) || ""
  );
  const [link, setLink] = useState((urlInfo && urlInfo.url) || "");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState(null);
  const [language, setLanguage] = useState("");
  const [imageUrl, setImageUrl] = useState(
    (urlInfo && urlInfo.image && urlInfo.image.url) ||
      "https://images.unsplash.com/photo-1504541989296-167df755af3f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
  );
  const [redirectToHome, setRedirectToHome] = useState(false);
  if (redirectToHome) {
    return <Redirect to="/home" />;
  }

  const handleChangeTitle = event => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = event => {
    setDescription(event.target.value);
  };
  const handleChangeLink = event => {
    setLink(event.target.value);
  };
  const handleChangeDate = value => {
    setDate(value);
  };

  const handleChangeCategory = (_event, category) => {
    setCategory(replaceSpaceWithHyphens(category));
  };

  const handleChangeLanguage = event => {
    setLanguage(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    PlansService.createPlan({
      date,
      title,
      description,
      link,
      category: category.toLowerCase(),
      language,
      imageUrl
    }).then(
      () => setRedirectToHome(true),
      error => {
        console.error(error);
      }
    );
    console.log({ date, title, description, link, category, language });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormHeader>Add a plan:</FormHeader>
        <FormControl className={classes.formControl}>
          <TextField
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={handleChangeTitle}
            variant="outlined"
            required
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="description"
            id="description"
            label="Description"
            value={description}
            onChange={handleChangeDescription}
            multiline
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            name="link"
            id="link"
            label="Link"
            value={link}
            onChange={handleChangeLink}
            required
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <DatePicker date={date} handleChangeDate={handleChangeDate} />
        </FormControl>

        <StyledInputLabel>Category*</StyledInputLabel>
        <CategoriesWrapper>
          {Object.entries(CATEGORIES).map(c => {
            return (
              <Chip
                key={c[0]}
                icon={c[1]}
                size="small"
                label={c[0]}
                clickable
                color="primary"
                onClick={e => handleChangeCategory(e, c[0])}
                variant={
                  category === replaceSpaceWithHyphens(c[0])
                    ? "default"
                    : "outlined"
                }
              />
            );
          })}
        </CategoriesWrapper>

        <StyledInputLabel>Language</StyledInputLabel>
        <StyledSelect
          id="demo-simple-select"
          value={language}
          onChange={handleChangeLanguage}
          className={classes.select}
        >
          {Object.entries(languages).map(entry => (
            <MenuItem value={entry[0]} key={entry[0]}>
              <OptionWrapper>
                <Avatar
                  alt={`flag-${entry[0].toLowerCase()}`}
                  src={entry[1]}
                  className={classes.small}
                />
                {capitalizeString(entry[0])}
              </OptionWrapper>
            </MenuItem>
          ))}
        </StyledSelect>

        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
};

export default PlansForm;
